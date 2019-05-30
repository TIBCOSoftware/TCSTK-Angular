// simple directive that can be used to fire an event when a component is created

import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[tcOnCreate]',
  exportAs: 'onCreate'
})
export class OnCreateDirective implements OnInit {
  @Input() idx: Number;
  @Output() fireCreated = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.fireCreated.emit();
  }

}
