import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';

@Component({
  selector: 'app-shatter-button',
  templateUrl: './shatter-button.component.html',
  styleUrls: ['./shatter-button.component.scss'],
})
export class ShatterButtonComponent implements OnInit {
clicked() {
  setTimeout(() => {
    this.onClick.emit();
  }, 500);
}
  @Input() title = '';
  @Input() size =200;

  @Output() onClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}
}
