import { Component, OnInit } from '@angular/core';
import {TibcoCloudSettingsGeneralComponent} from 'tc-core-lib';
import {Groups, Roles} from '../../models/tc-groups-data';

@Component({
  selector: 'tcla-live-apps-settings-roles',
  templateUrl: './live-apps-settings-roles.component.html',
  styleUrls: ['./live-apps-settings-roles.component.css']
})
export class LiveAppsSettingsRolesComponent extends TibcoCloudSettingsGeneralComponent implements OnInit {

  public roles: Roles;
  public groups: Groups;

  ngOnInit() {
    this.generalConfig = super.getRoute().snapshot.data.generalConfigHolder;
    this.roles = super.getRoute().snapshot.data.allRoles;
    this.groups = super.getRoute().snapshot.data.allGroups;
    this.claims = super.getRoute().snapshot.data.claims;
    this.sandboxId = Number(this.claims.primaryProductionSandbox.id).valueOf();
  }

}
