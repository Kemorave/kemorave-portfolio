import { Component, OnInit } from '@angular/core';

import {
  faGithub,
  faLinkedin,
  faCloudscale,
  faStackOverflow,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import {
  
  faBoxOpen,
  faExternalLink
} from '@fortawesome/free-solid-svg-icons';
import { KemoraveDataService, WizardLevel } from '../../core/services/kemorave-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dataService: KemoraveDataService) {}

  audio = new Audio('twitter.mp3');
  faGithub = faGithub;
  faLinkedinIn = faLinkedin;
  faCloudscale = faCloudscale;
  faStackOverflow = faStackOverflow;
  faExternalLink = faExternalLink;
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
      text: '\nGitHub\n@Kemorave',

      url: 'https://github.com/Kemorave/',
    },
    {
      icon: faCloudscale,
      text: '\nFrontend Mentor\n@Kemorave',

      url: 'https://www.frontendmentor.io/profile/Kemorave',
    },
    {
      icon: faLinkedin,
      text: '\nLinkedin\n@Ibrahim-dirar',
      url: 'https://www.linkedin.com/in/ibrahim-dirar-482270206/',
    },
  ];
  currentLevel!: { years: number; level: WizardLevel };
  ngOnInit() {
    this.audio.load();

    this.currentLevel = this.dataService.getMyLevel();
  }
  openLink(link: string) {
    setTimeout(() => {
      window.open(link);
    }, 1500);
  }
}
