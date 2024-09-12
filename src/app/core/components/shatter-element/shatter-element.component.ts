import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';

declare function Delaunay(any: any): any;

declare var Cubic: any;
declare var Back: any;
@Component({
  selector: 'app-shatter-element',
  templateUrl: './shatter-element.component.html',
  styleUrls: ['./shatter-element.component.scss'],
})
export class ShatterElementComponent implements OnInit, AfterViewInit {
  constructor() {}
  @Input() src: string = 'whiteImage.jpg';
  @Output() onShatter = new EventEmitter<void>();
  _TWO_PI: number = Math.PI * 2;

  //images: HTMLImageElement[] = [];
  //imageIndex: number = 0;
  _image!: HTMLImageElement;
  _imageWidth: number = 0;
  _imageHeight: number = 0;
  _vertices: number[][] = [];
  _indices: number[] = [];
  _fragments: Fragment[] = [];
  @ViewChild('container')
  _container!: HTMLElement | null;
  _clickPosition!: number[];
  imagesLoaded(): void {
    // this.container?.removeChild(this.image);
    this.placeImage(false);
    this.triangulate();
    //this.shatter();
  }

  placeImage(transitionIn: boolean = true): void {
    //this.image = this.images[this.imageIndex];

    //if (++this.imageIndex === this.images.length) this.imageIndex = 0;

    this._image.addEventListener('mousedown', (a) => this.imageClickHandler(a));
    this._container?.appendChild(this._image);

    if (transitionIn) {
      gsap.core.Tween.fromTo(
        this._image,
        0.75,
        { y: -1000 },
        { y: 0, ease: Back.easeOut }
      );
    }
  }

  imageClickHandler(event: MouseEvent): void {
    const box: DOMRect = this._image.getBoundingClientRect();
    const top: number = box.top;
    const left: number = box.left;

    this._clickPosition[0] = event.clientX - left;
    this._clickPosition[1] = event.clientY - top;

    this.onShatter.emit();
    this.triangulate();
    this.shatter();
  }

  triangulate(): void {
    const rings: { r: number; c: number }[] = [
      { r: 50, c: 12 },
      { r: 150, c: 12 },
      { r: 300, c: 12 },
      { r: 1200, c: 12 },
    ];
    let x: number;
    let y: number;
    const centerX: number = this._clickPosition[0];
    const centerY: number = this._clickPosition[1];

    this._vertices.push([centerX, centerY]);

    rings.forEach((ring) => {
      const radius: number = ring.r;
      const count: number = ring.c;
      const variance: number = radius * 0.25;

      for (let i: number = 0; i < count; i++) {
        x =
          Math.cos((i / count) * this._TWO_PI) * radius +
          centerX +
          this.randomRange(-variance, variance);
        y =
          Math.sin((i / count) * this._TWO_PI) * radius +
          centerY +
          this.randomRange(-variance, variance);
        this._vertices.push([x, y]);
      }
    });

    this._vertices.forEach((v) => {
      v[0] = this.clamp(v[0], 0, this._imageWidth);
      v[1] = this.clamp(v[1], 0, this._imageHeight);
    });

    this._indices = (Delaunay as any).triangulate(this._vertices);
  }

  shatter(): void {
    let p0: number[], p1: number[], p2: number[];
    let fragment: Fragment;

    const tl0 = new gsap.core.Timeline({
      onComplete: () => this.shatterCompleteHandler(),
    });

    for (let i: number = 0; i < this._indices.length; i += 3) {
      p0 = this._vertices[this._indices[i + 0]];
      p1 = this._vertices[this._indices[i + 1]];
      p2 = this._vertices[this._indices[i + 2]];

      fragment = new Fragment(p0, p1, p2, () => this._image);

      const dx: number = fragment.centroid[0] - this._clickPosition[0];
      const dy: number = fragment.centroid[1] - this._clickPosition[1];
      const d: number = Math.sqrt(dx * dx + dy * dy);
      const rx: number = 30 * this.sign(dy);
      const ry: number = 90 * -this.sign(dx);
      const delay: number = d * 0.003 * this.randomRange(0.9, 1.1);
      fragment.canvas.style.zIndex = Math.floor(d).toString();

      const tl1 = new gsap.core.Timeline();

      tl1.to(fragment.canvas, 1.5, {
        z:100,
        rotationX: rx,
        rotationY: ry,
        ease: Cubic.easeIn,
      });
      tl1.to(fragment.canvas, 3.4, { alpha: 1 }, 0.6);

      tl0.add(tl1, delay);

      this._fragments.push(fragment);
      fragment.canvas.classList.add('fragment-canvas');
      this._container?.appendChild(fragment.canvas);
    }

    this._container?.removeChild(this._image);
    this._image.removeEventListener('mousedown', (a) =>
      this.imageClickHandler(a)
    );
  }

  shatterCompleteHandler(): void {
    this._fragments.forEach((f) => {
      this._container?.removeChild(f.canvas);
    });
    this._fragments.length = 0;
    this._vertices.length = 0;
    this._indices.length = 0;
    //this.placeImage();
  }

  randomRange(min: number, max: number): number {
    return min + (max - min) * Math.random();
  }

  clamp(x: number, min: number, max: number): number {
    return x < min ? min : x > max ? max : x;
  }

  sign(x: number): number {
    return x < 0 ? -1 : 1;
  }

  ngOnInit() {}

  loaded() {
    this._container = (this._container as any).nativeElement;

    this._imageWidth = this._container?.getBoundingClientRect().width!;
    this._imageHeight = this._container?.getBoundingClientRect().height!;

    this._clickPosition = [this._imageWidth * 0.5, this._imageHeight * 0.5];
    gsap.core.Tween.set(this._container, { perspective: 500 });

    this._image = new Image();
    this._image.src = this.src;
    this._image.style.objectFit = 'cover';
    this._image.onload = () => {
      this.imagesLoaded();
      // for (let i: number = 1; i < 4; i++) {
      //   this.images[i] = this.image = new Image();
      //   this.image.src = urls[i];
      // }
    };
    //   this.image.src = urls[0];
  }
  ngAfterViewInit(): void {
    this.loaded();
  }
}

class Fragment {
  v0: number[];
  v1: number[];
  v2: number[];
  image: any;
  box!: { x: number; y: number; w: number; h: number };
  centroid!: number[];
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  constructor(v0: number[], v1: number[], v2: number[], image: any) {
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
    this.image = image;
    this.computeBoundingBox();
    this.computeCentroid();
    this.createCanvas();
    this.clip();
  }

  computeBoundingBox(): void {
    const xMin: number = Math.min(this.v0[0], this.v1[0], this.v2[0]);
    const xMax: number = Math.max(this.v0[0], this.v1[0], this.v2[0]);
    const yMin: number = Math.min(this.v0[1], this.v1[1], this.v2[1]);
    const yMax: number = Math.max(this.v0[1], this.v1[1], this.v2[1]);

    this.box = {
      x: xMin,
      y: yMin,
      w: xMax - xMin,
      h: yMax - yMin,
    };
  }

  computeCentroid(): void {
    const x: number = (this.v0[0] + this.v1[0] + this.v2[0]) / 3;
    const y: number = (this.v0[1] + this.v1[1] + this.v2[1]) / 3;

    this.centroid = [x, y];
  }

  createCanvas(): void {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.box.w;
    this.canvas.height = this.box.h;
    this.canvas.style.width = this.box.w + 'px';
    this.canvas.style.height = this.box.h + 'px';
    this.canvas.style.left = this.box.x + 'px';
    this.canvas.style.top = this.box.y + 'px';
    this.ctx = this.canvas.getContext('2d')!;
  }

  clip(): void {
    this.ctx.translate(-this.box.x, -this.box.y);
    this.ctx.beginPath();
    this.ctx.moveTo(this.v0[0], this.v0[1]);
    this.ctx.lineTo(this.v1[0], this.v1[1]);
    this.ctx.lineTo(this.v2[0], this.v2[1]);
    this.ctx.closePath();
    this.ctx.clip();
    this.ctx.drawImage(this.image(), 0, 0);
  }
}
