import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgParticlesModule } from 'ng-particles';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './features/intro/intro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxParticlesModule } from '@tsparticles/angular';
@NgModule({
  declarations: [AppComponent, IntroComponent],
  imports: [
    BrowserModule,
    NgParticlesModule,NgxParticlesModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
