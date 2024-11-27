import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ShatterElementComponent } from '../shatter-element/shatter-element.component';

@Component({
  selector: 'app-shatter-container',
  templateUrl: './shatter-container.component.html',
  styleUrls: ['./shatter-container.component.css'],
})
export class ShatterContainerComponent implements OnInit {
  @ViewChild('shEle')
  shatterElement!: ShatterElementComponent;

  @Output() onShatter = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {
    this.shatterElement.onShatter.subscribe(() => this.onShatter.emit());
  }
}
