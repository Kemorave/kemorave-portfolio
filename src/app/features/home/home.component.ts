import { Component, OnInit } from '@angular/core';

import {
  faGithub,
  faLinkedin,
  faCloudscale,
  faStackOverflow,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  openLink(link: string) {
    setTimeout(() => {
    window.open(link);
    },1500);
  }
  audio = new Audio('twitter.mp3');
  constructor() {}
  faGithub = faGithub;
  faLinkedinIn = faLinkedin;
  faCloudscale = faCloudscale;
  faStackOverflow = faStackOverflow;
  projectsList: {
    imagesUrlList: string[];
    text: string;
    url: string;
  }[] = [];
  whereToFindMeList: {
    icon: IconDefinition;
    text: string;
    url: string;
  }[] = [
    {
      icon: faGithub,
      text: '@Kemorave',
      url: 'https://github.com/Kemorave/',
    },
    {
      icon: faCloudscale,
      text: '@Kemorave',
      url: 'https://www.frontendmentor.io/profile/Kemorave',
    },
    {
      icon: faLinkedin,
      text: '@Ibrahim',
      url: 'https://www.linkedin.com/in/ibrahim-dirar-482270206/',
    },
  ];
  ngOnInit() {
    this.audio.load();
  }
}
