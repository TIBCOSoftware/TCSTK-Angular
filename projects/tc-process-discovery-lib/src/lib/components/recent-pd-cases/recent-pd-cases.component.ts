import { Component, OnInit } from '@angular/core';
import {LiveAppsRecentCasesComponent} from 'tc-liveapps-lib';

@Component({
  selector: 'tcpd-recent-pd-cases',
  templateUrl: './recent-pd-cases.component.html',
  styleUrls: ['./recent-pd-cases.component.css']
})
export class RecentPdCasesComponent  extends LiveAppsRecentCasesComponent {

  // this is something extra that we use in the PD version of this component
  public getGreeting = () => {
    return 'Process Discovery Cases';
  }

}
