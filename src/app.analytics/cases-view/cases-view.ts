import {Component, EventEmitter, Input, Output, SimpleChanges, OnChanges, OnInit} from '@angular/core';
import {RouteAction, TcButtonsHelperService, ToolbarButton} from '@tibco-tcstk/tc-core-lib';
import {
    LiveAppsHomeCockpitComponent,
    Roles,
    RouteAccessControlConfigurationElement,
    FormConfig,
    TcRolesService
} from '@tibco-tcstk/tc-liveapps-lib';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {MatButtonToggleChange, MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'app-risk-case-overview',
    templateUrl: './cases-view.html',
    styleUrls: ['./cases-view.css']
})

export class CasesViewComponent extends LiveAppsHomeCockpitComponent implements OnChanges, OnInit {

    /**
     * The Application ID of the UI (should ideally be unique as it is shared state key)
     */
    @Input() uiAppId: string;

    /**
     * The list of LA Application IDs you want to handle
     */
    @Input() appIds: string[];

    /**
     * sandboxId - this comes from claims resolver
     */
    @Input() sandboxId: number;

    /**
     * The name of the logged user
     */
    @Input() userName: string;

    /**
     * The ID of the logged user
     */
    @Input() userId: string;

    /**
     * * Email address of the user (comes from resolver)
     */
    @Input() email: string;

    /**
     * page title comes from config resolver
     */
    @Input() title: string;

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
     * Enable legacy creators
     */
    @Input() legacyCreators: boolean = this.legacyCreators ? this.legacyCreators : false;

    /**
     * Allow override of forms framework
     * Options: bootstrap-4 or material-design
     */
    @Input() formsFramework: string = this.formsFramework ? this.formsFramework : 'material-design';

    /**
     * ~event routeAction : Component requests route to another page
     * ~payload RouteAction : RouteAction object to tell caller to navigate somewhere
     */
    @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

    public currentView: string;
    public viewButtons: ToolbarButton[];

    constructor(protected buttonsHelper: TcButtonsHelperService, public dialog: MatDialog, protected rolesService: TcRolesService, public router: Router) {
        super(buttonsHelper, dialog, rolesService);
    }


    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);
    }

    ngOnInit() {
        this.title = 'Welcome - ' + this.userName;
        const buttonHome = this.buttonsHelper.createButton('splash', 'tcs-home', true, 'Home', true, true, 'Home');
        const buttonAnalytics = this.buttonsHelper.createButton('home', 'tcs-pie-chart', true, 'Analyse Risky Transactions', true, true, 'Risk Analysis');
        const buttonOverview = this.buttonsHelper.createButton('overview', 'tcs-caselist-icon', true, 'An Overview of Risk Investigations', true, true, 'Investigation Overview');
        this.burgerMenuButtons = [buttonHome, buttonAnalytics, buttonOverview];
    }

    public handleBurgerMenuClick = (event) => {
        const target = '/starterApp/' + event;
        console.log('--> Navigating to: ' , target);
        this.router.navigate([target]);
    }


}
