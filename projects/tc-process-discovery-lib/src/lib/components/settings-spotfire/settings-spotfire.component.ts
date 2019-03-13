import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tcpd-settings-spotfire',
  templateUrl: './settings-spotfire.component.html',
  styleUrls: ['./settings-spotfire.component.css']
})
export class SettingsSpotfireComponent implements OnInit {

    public spotfireServer: string;
    public analysisPath: string;
    public tableName: string;
    public activePageForHome: string;
    public activePageForDetails: string;
    public markingName: string;
    public maxMarkings : number;
    public allowedPages: string;
    public columnNames: string;

  constructor() { }

  ngOnInit() {
      this.spotfireServer = "https://spotfire-next.cloud.tibco.com/spotfire/wp";
      this.analysisPath = "/Teams/TIB_SUB_01BB7F22MGX01K6MQK0TD02DYV/Risk Investigation Analytics Template V3";

      this.tableName = "newtransactionsscoredwstate";

      this.activePageForHome = "Transaction Map";
      this.activePageForDetails = "Create Cases";
    
      this.markingName = "Case Marking";
      this.maxMarkings = 20;

      this.allowedPages = "View Score Distribution,Set Thresholds,Transaction Map,Create Cases,Track Cases";
      this.columnNames = "id,oddity,fraud_probability";
  }

}
