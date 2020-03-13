import {Component, EventEmitter, Input, Output, SimpleChanges, OnChanges, OnInit} from '@angular/core';
import {RouteAction, TcButtonsHelperService} from '@tibco-tcstk/tc-core-lib';
import {
  LiveAppsCaseCockpitComponent,
  Roles,
  RouteAccessControlConfigurationElement,
  FormConfig,
  TcRolesService, LiveAppsService
} from '@tibco-tcstk/tc-liveapps-lib';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotfireConfig} from '@tibco-tcstk/tc-spotfire-lib';

@Component({
    selector: 'app-case-details',
    templateUrl: './case-details.component.html',
    styleUrls: ['./case-details-style.css']
})

export class CaseDetailsComponent extends LiveAppsCaseCockpitComponent implements OnChanges, OnInit {
    /**
     * The Application ID of the UI (should ideally be unique as it is shared state key)
     */
@Input() uiAppId: string;

    /**
     * The LA Application Id
     */
@Input() appId: string;

    /**
     * The LA Application Type Id (generally 1)
     */
@Input() typeId: string;

    /**
     * sandboxId - this comes from claims resolver
     */
@Input() sandboxId: number;

    /**
     * The case reference
     */
@Input() caseRef: string;

    /**
     * The workitem Id
     */
@Input() workitemId: number;

    /**
     * The ID of the logged user
     */
@Input() userId: string;

    /**
     * The list of LA Application Ids you want to mark as recent cases when accessed
     */
@Input() exclRecentAppIds: string[];

    /**
     * Roles - The users current roles
     */
@Input() roles: Roles;

    /**
     * RouteAccessControlConfig - basically the config for access control
     */
@Input() access: RouteAccessControlConfigurationElement;

    /**
     * Custom Form Layout Configuration
     */
@Input() formConfig: FormConfig;

    /**
     * Custom Form configuration file
     */
@Input() customFormDefs: CustomFormDefs;

    /**
     * Enable legacy workitems
     */
@Input() legacyWorkitems: boolean = this.legacyWorkitems ? this.legacyWorkitems : false;

    /**
     * Enable legacy actions
     */
@Input() legacyActions: boolean = this.legacyActions ? this.legacyActions : false;

    /**
     * Layout object that can be passed to override default layout of the form renderer
     */
@Input() layout: any[] = this.layout ?  this.layout : this.DEFAULT_CASE_DATA_LAYOUT;

    /**
     * Allow override of forms framework
     * Options: bootstrap-4 or material-design
     */
@Input() formsFramework: string = this.formsFramework ? this.formsFramework : 'material-design';

    /**
     * Whether to show workitems in context panel (default true)
     */
@Input() showWorkitems: boolean = this.showWorkitems ? this.showWorkitems :  true;

    /**
     * Whether to show notes in context panel (default true)
     */
@Input() showNotes: boolean = this.showNotes ? this.showNotes : true;

    /**
     * Whether to show documents in context panel (default true)
     */
@Input() showDocuments: boolean = this.showDocuments ? this.showDocuments : true;

    /**
     * Whether to show states in context panel (default true)
     */
@Input() showStates: boolean = this.showStates ? this.showStates :  true;

    /**
     * Whether to show audit in context panel (default true)
     */
@Input() showAudit: boolean = this.showAudit ? this.showAudit :  true;


    /**
     * ~event routeAction : Component requests route to another page
     * ~payload RouteAction : RouteAction object to tell caller to navigate somewhere
     */
@Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();


  public sFConfig: SpotfireConfig;

  constructor(protected liveapps: LiveAppsService, protected buttonsHelper: TcButtonsHelperService, protected router: Router, protected rolesService: TcRolesService, private activeRoute: ActivatedRoute ){
    super(liveapps, buttonsHelper, router, rolesService);
    console.log('Initial Spotfire Config: ', activeRoute.snapshot.data.spotfireConfigHolder);
    this.sFConfig = activeRoute.snapshot.data.spotfireConfigHolder;


  }


    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
    }

    ngOnInit() {

    }
}
