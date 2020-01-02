import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Claim, GeneralConfig, GeneralConfigResolver, RouteAction, Sandbox} from '@tibco-tcstk/tc-core-lib';
import {AccessResolver} from '../../resolvers/access.resolver';
import {ClaimsResolver} from '../../resolvers/claims.resolver';
import {Groups} from '../../models/tc-groups-data';
import {GroupsResolver} from '../../resolvers/groups.resolver';
import {LiveAppsConfig} from '../../models/tc-liveapps-config';
import {LiveAppsConfigResolver} from '../../resolvers/liveapps-config.resolver';
import {Roles} from '../../models/tc-groups-data';
import {RolesResolver} from '../../resolvers/roles.resolver';
import {RouteAccessControlConfigurationElement} from '../../models/tc-groups-data';
import {CustomFormDefs, FormResolver} from '@tibco-tcstk/tc-forms-lib';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'tcla-live-apps-case-cockpit-standalone',
  templateUrl: './live-apps-case-cockpit-standalone.component.html',
  styleUrls: ['./live-apps-case-cockpit-standalone.component.css']
})
export class LiveAppsCaseCockpitStandaloneComponent implements OnChanges {

  /**
   * The LA Application Id
   */
  @Input() appId: string;

  /**
   * The LA Application Type Id (generally 1)
   */
  @Input() typeId: string;

  /**
   * The case reference
   */
  @Input() caseRef: string;

  /**
   * The workitem Id
   */
  @Input() workitemId: number;

  /**
   * ~event routeAction : Component requests route to another page
   * ~payload RouteAction : RouteAction object to tell caller to navigate somewhere
   */
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

  constructor(protected claimsResolver: ClaimsResolver, protected appConfigResolver: GeneralConfigResolver, protected liveAppsConfigResolver: LiveAppsConfigResolver, protected groupsResolver: GroupsResolver, protected rolesResolver: RolesResolver, protected accessResolver: AccessResolver, protected customFormsResolver: FormResolver) { }
  public generalConfig: GeneralConfig;
  public liveAppsConfig: LiveAppsConfig;
  public exclRecentAppIds: string[];
  public claims: Claim;
  public sandbox: Sandbox;
  public groups: Groups;
  public roles: Roles;
  public access: RouteAccessControlConfigurationElement;
  public customFormDefs: CustomFormDefs;
  public sandboxId: number;
  public ready = false;

  public handleRouteAction = (routeAction: RouteAction) => {
    this.routeAction.emit(routeAction);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.caseRef && this.appId && this.typeId) {
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
          this.ready = true;
        }
      );
    }
  }

}
