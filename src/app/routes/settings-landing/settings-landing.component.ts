import { Component, OnInit } from '@angular/core';
import { GeneralLandingPageConfig, LandingPageConfig } from '@tibco-tcstk/tc-liveapps-lib';
import { ActivatedRoute } from '@angular/router';
import { RoleAttribute, TcGeneralLandingPageConfigService } from '@tibco-tcstk/tc-core-lib';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './settings-landing.component.html',
  styleUrls: ['./settings-landing.component.css']
})
export class SettingsLandingComponent implements OnInit {

  private landingPagesConfig: GeneralLandingPageConfig;
  public allRoles: RoleAttribute[];
  public landingPages: LandingPageConfig[];

  public sandboxId: number;
  public uiAppId: string;

  constructor(
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar, 
    private generalLandingPageConfigService: TcGeneralLandingPageConfigService
  ) { }

  ngOnInit(): void {
    this.landingPagesConfig = this.route.snapshot.data.landingPagesConfigHolder;
    this.landingPages = this.landingPagesConfig.landingPage;
    this.allRoles = this.route.snapshot.data.allRolesHolder.roles.filter(element => !element.configuration);

    this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
    this.uiAppId = this.route.snapshot.data.landingPagesConfigHolder.uiAppId;
  }

  public handleSave = (): void => {
    this.generalLandingPageConfigService.updateGeneralLandingPageConfig(this.sandboxId, this.uiAppId, this.landingPagesConfig, this.landingPagesConfig.id).subscribe(
      result => {
        this.snackBar.open('Landing Pages configuration saved', 'OK', {
          duration: 3000
        });
      },
      err => {
        this.snackBar.open('Error saving Landing Pages configuration', 'OK', {
          duration: 3000
        });
      }
    );
  }
}
