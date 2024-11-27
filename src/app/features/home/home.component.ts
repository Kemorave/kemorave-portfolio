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
    window.open(link, '_blank');
  }
  audio = new Audio('twitter.mp3');
  constructor() {}
  faGithub = faGithub;
  faLinkedinIn = faLinkedin;
  faCloudscale = faCloudscale;
  faStackOverflow = faStackOverflow;
  projectsList: {
    imagesUrlList: string[],
    text: string,
    url: string,
    url: string,
  }[] = [
    
  ];
  whereToFindMeList: {
    icon: IconDefinition;
    text: string;
    url: string;
  }[] = [
    {
      icon: faGithub,
      text: '@Kemorave',
      url: 'https://github.com/Kemorave',
    },
    {
      icon: faLinkedin,
      text: '@Ibrahim',
      url: 'https://www.linkedin.com/in/ibrahim-kemorave/',
    },
    {
      icon: faCloudscale,
      text: '@Kemorave',
      url: 'https://cloudscale.ch',
    },
  ];
  ngOnInit() {
    this.audio.load();
  }
}
