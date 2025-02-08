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
    
    smooth: false,
    fpsLimit: 120,

    particles: {
      color: {
        value: '#FFFFFF38',
      },
     
      move: {
        direction: MoveDirection.right,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: true,
        speed: 5, 
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
          speed: 1.5,
        },
      },
     
      size: {
        value: { min: 0.5, max: 3 },
      },
    },
    detectRetina: true,
  };
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
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
