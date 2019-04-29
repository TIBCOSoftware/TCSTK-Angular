import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceDetails} from '../../models/service-details';


@Component({
  selector: 'tccwm-select-service-display',
  templateUrl: './select-service-display.component.html',
  styleUrls: ['./select-service-display.component.css']
})
export class SelectServiceDisplayComponent implements OnInit {

  @Input()  serviceDetailsList: Array<ServiceDetails>;
  @Input()  curServiceDetails: ServiceDetails;


  @Output() selectServiceEvent: EventEmitter<ServiceDetails> = new EventEmitter<ServiceDetails>();

  constructor() { }

  ngOnInit() {
  }


  public selectService = (serviceDetail) => {
    this.selectServiceEvent.emit(serviceDetail);
  }


}
