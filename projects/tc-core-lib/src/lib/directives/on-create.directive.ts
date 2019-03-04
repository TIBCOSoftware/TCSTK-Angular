import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[tcOnCreate]',
  exportAs: 'onCreate'
})
export class OnCreateDirective implements OnInit {
  // @Output() created: EventEmitter<string> = new EventEmitter<string>();
  @Input() idx: Number;
  @Output() fireCreated: EventEmitter<Number> = new EventEmitter<Number>();


  constructor() {
  }

  ngOnInit(): void {
    this.fireCreated.emit(this.idx);
  }


}
