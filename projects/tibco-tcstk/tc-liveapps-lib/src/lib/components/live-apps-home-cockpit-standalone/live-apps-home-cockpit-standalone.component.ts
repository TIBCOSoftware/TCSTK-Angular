import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccessResolver} from '../../resolvers/access.resolver';
import {CaseType} from '../../models/liveappsdata';
import {ClaimsResolver} from '../../resolvers/claims.resolver';
import {Groups} from '../../models/tc-groups-data';
import {GroupsResolver} from '../../resolvers/groups.resolver';
import {LiveAppsConfig} from '../../models/tc-liveapps-config';
import {LiveAppsConfigResolver} from '../../resolvers/liveapps-config.resolver';
import {Roles} from '../../models/tc-groups-data';
import {RolesResolver} from '../../resolvers/roles.resolver';
import {RouteAccessControlConfigurationElement} from '../../models/tc-groups-data';
import {CustomFormDefs, FormResolver} from '@TIBCOSoftware/tc-forms-lib';
import {forkJoin} from 'rxjs';
import {Claim, GeneralConfig, GeneralConfigResolver, RouteAction} from '@TIBCOSoftware/tc-core-lib';

@Component({
  selector: 'tcla-live-apps-home-cockpit-standalone',
  templateUrl: './live-apps-home-cockpit-standalone.component.html',
  styleUrls: ['./live-apps-home-cockpit-standalone.component.css']
})
export class LiveAppsHomeCockpitStandaloneComponent implements OnInit {

  /**
   * ~event routeAction : Component requests route to another page
   * ~payload RouteAction : RouteAction object to tell caller to navigate somewhere
   */
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

  constructor(protected claimsResolver: ClaimsResolver, protected appConfigResolver: GeneralConfigResolver, protected liveAppsConfigResolver: LiveAppsConfigResolver, protected groupsResolver: GroupsResolver, protected rolesResolver: RolesResolver, protected accessResolver: AccessResolver, protected customFormsResolver: FormResolver) { }

  public generalConfig: GeneralConfig;
  public liveAppsConfig: LiveAppsConfig;
  private claims: Claim;
  public sandboxId: number;
  public selectedAppConfig: CaseType;
  public userName: string;
  public userId: string;
  public email: string;
  public groups: Groups;
  public roles: Roles;
  public access: RouteAccessControlConfigurationElement;
  public customFormDefs: CustomFormDefs;
  public welcomeMessage: string;
  public ready = false;

  public handleRouteAction = (routeAction: RouteAction) => {
    this.routeAction.emit(routeAction);
  }

  ngOnInit() {
    const resolversArray = [];
    resolversArray.push(this.claimsResolver.resolve());
    resolversArray.push(this.appConfigResolver.resolve());
    resolversArray.push(this.liveAppsConfigResolver.resolve(undefined));
    resolversArray.push(this.groupsResolver.resolve());
    resolversArray.push(this.rolesResolver.resolve());
    resolversArray.push(this.accessResolver.resolve());
    resolversArray.push(this.customFormsResolver.resolve());

    const resolvers$ = forkJoin(resolversArray).subscribe(
      next => {
        this.claims = new Claim().deserialize(next[0]);
        this.generalConfig = new GeneralConfig().deserialize(next[1]);
        this.liveAppsConfig = new LiveAppsConfig().deserialize(next[2]);
        this.groups = new Groups().deserialize(next[3]);
        this.roles = new Roles().deserialize(next[4]);
        this.access = new RouteAccessControlConfigurationElement().deserialize(next[5]);
        this.customFormDefs = new CustomFormDefs().deserialize(next[6]);
        this.sandboxId = Number(this.claims.primaryProductionSandbox.id);
        this.userName = this.claims.firstName + ' ' + this.claims.lastName;
        this.email = this.claims.email;
        this.userId = this.claims.id;
        this.welcomeMessage = this.generalConfig.welcomeMessage ? this.generalConfig.welcomeMessage : 'Welcome to Case Manager';
        this.ready = true;
      }
    );
  }

}
