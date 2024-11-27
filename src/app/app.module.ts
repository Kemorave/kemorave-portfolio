import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgParticlesModule } from 'ng-particles';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './features/intro/intro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxParticlesModule } from '@tsparticles/angular';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { HomeComponent } from './features/home/home.component';
import { ShatterElementComponent } from './core/components/shatter-element/shatter-element.component';
import { ShatterButtonComponent } from './core/components/shatter-button/shatter-button.component';
import { ShatterContainerComponent } from './core/components/shatter-container/shatter-container.component';
@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    NavMenuComponent,
    AboutMeComponent,
    HomeComponent,
    ShatterElementComponent,
    ShatterButtonComponent,
    ShatterContainerComponent,
  ],
  imports: [
    BrowserModule,
    NgParticlesModule,
    NgxParticlesModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
