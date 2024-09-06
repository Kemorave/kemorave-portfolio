import { Component, OnInit } from '@angular/core';
import { IParticlesProps, NgParticlesService } from '@tsparticles/angular';
import { loadSnowPreset } from '@tsparticles/preset-snow';

import {
  ClickMode,
  Container,
  HoverMode,
  MoveDirection,
  OutMode,
  ResizeEvent,
} from 'tsparticles-engine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'kemorave-portfolio';
  id = 'tsparticles';

  particlesOptions: IParticlesProps = {
    background: {
      color: {
        value: '#000000',
      },
    },
    smooth: true,
    fpsLimit: 120,
   
    particles: {
      color: {
        value: '#ffffff',
      },
      links: {
        color: '#ffffff',
        distance: 200,
        enable: true,
        opacity: 0.3,
        width: 5,
      },
      move: {
        direction: MoveDirection.bottom,
        enable: true,
        outModes: {
          default: OutMode.bounce,
        },
        random: true,
        speed: 1,
        straight: true,

      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
        animation: {
          enable: true,
          
          decay: 0.03,
          count: 10,
          speed: 0.5,
        }
      },
      shape: {
        type: 'circle',

      },
      size: {
        value: { min: 0.5, max: 3 },
      },
    },
    detectRetina: true,
  };
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    setTimeout(() => {
      var audio = new Audio('twitter.mp3');
      audio.play();
    }, 1000);
    this.ngParticlesService.init(async (engine) => {
      console.log(engine);

      // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadFull(engine);
      await loadSnowPreset(engine);
    });
  }
}
