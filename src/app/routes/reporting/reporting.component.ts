import { Component, OnInit } from '@angular/core';
import {LiveAppsConfig} from '@tibco-tcstk/tc-liveapps-lib';
import {Claim, GeneralConfig} from '@tibco-tcstk/tc-core-lib';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'laapp-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  public generalConfig: GeneralConfig;
  public liveAppsConfig: LiveAppsConfig;
  private claims: Claim;
  public sandboxId: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
    this.claims = this.route.snapshot.data.claims;
    this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
  }

}
