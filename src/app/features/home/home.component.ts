import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  audio = new Audio('twitter.mp3');
  constructor() {}

  ngOnInit() {
    this.audio.load();
  }
}
