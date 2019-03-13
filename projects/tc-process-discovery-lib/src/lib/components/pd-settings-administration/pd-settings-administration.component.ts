import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tcpd-pd-settings-administration',
  templateUrl: './pd-settings-administration.component.html',
  styleUrls: ['./pd-settings-administration.component.css']
})
export class PdSettingsAdministrationComponent implements OnInit {

    public cases = [];
    public uiAppId : string;
    public sandboxId : string;
    /////

    public displayType;
  constructor() { }

  ngOnInit() { 
      this.cases = [209261, 209871, 209881 ]; 
      this.uiAppId = '2504';
      this.sandboxId = '31';
  }

  clickCaseAction = ($event) => {
      
  }

}
