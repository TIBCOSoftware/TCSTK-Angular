import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProcessDiscoveryCaseRoute } from '../../models/pd-liveappsdata';
import { RouteAction } from 'tc-core-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'tcpd-pd-settings-administration',
  templateUrl: './pd-settings-administration.component.html',
  styleUrls: ['./pd-settings-administration.component.css']
})
export class PdSettingsAdministrationComponent implements OnInit {

    public cases = [];
    public uiAppId : string;
    public sandboxId : string;
    public displayType : string;
    @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();
    /////

  constructor(private router: Router) { }

  ngOnInit() { 
      this.cases = [209261, 209871, 209881 ]; 
      this.uiAppId = '2504';
      this.sandboxId = '31';
      this.displayType = 'card';
  }

  clickCaseAction = ($event: ProcessDiscoveryCaseRoute) => {
      if ($event.option === 'set'){

      }
      if ($event.option === 'open'){
        // case clicked - tell parent (will pass caseRef and appId)
        this.router.navigate(['/starterApp/case/' + $event.appId + '/' + $event.typeId + '/' + $event.caseRef]);      }
  }

}
