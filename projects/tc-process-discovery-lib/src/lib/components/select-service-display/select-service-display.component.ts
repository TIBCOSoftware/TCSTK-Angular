import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceDetails} from '../../models/process-discovery';

@Component({
  selector: 'tcpd-select-service-display',
  templateUrl: './select-service-display.component.html',
  styleUrls: ['./select-service-display.component.css']
})
export class SelectServiceDisplayComponent implements OnInit {

  @Input()  serviceDetailsList: Array<ServiceDetails>;





  @Output() selectServiceEvent: EventEmitter<ServiceDetails> = new EventEmitter<ServiceDetails>();

  constructor() { }

  ngOnInit() {
  }


  public selectService = (serviceDetail) => {
    this.selectServiceEvent.emit(serviceDetail);


  }


}
