import { Component, OnInit, ViewChild } from '@angular/core';
import { ShatterContainerComponent } from '../../core/components/shatter-container/shatter-container.component';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  @ViewChild('shCont')
  shCont!:ShatterContainerComponent;
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.shCont.shatterElement.shatter();
    }, 1000);
  }
}
