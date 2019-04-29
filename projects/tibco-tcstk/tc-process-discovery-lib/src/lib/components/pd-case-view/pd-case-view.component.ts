import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarButton, TcButtonsHelperService, RoleAttribute } from '@tibco-tcstk/tc-core-lib';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import {LiveAppsHomeCockpitComponent, TcRolesService, Groups} from '@tibco-tcstk/tc-liveapps-lib';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';

@Component({
    selector: 'tcpd-pd-case-view',
    templateUrl: './pd-case-view.component.html',
    styleUrls: ['./pd-case-view.component.css']
})
export class PdCaseViewComponent extends LiveAppsHomeCockpitComponent {
    public sandboxId: number;
    public title: string;
    public viewButtons: ToolbarButton[];
    public appIds: string[];
    public uiAppId: string;
    public userId: string;
    public displayRoles: RoleAttribute[];
    public currentRole: RoleAttribute;

    private groups: Groups;

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        protected buttonsHelper: TcButtonsHelperService,
        public dialog: MatDialog,
        private processDiscovery: PdProcessDiscoveryService,
        protected roleService: TcRolesService
    ) {
        super(buttonsHelper, dialog, roleService);
     }

    ngOnInit() {
        
        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        this.title = this.route.snapshot.data.laConfigHolder.generalConfig.welcomeMessage;
        this.appIds = this.route.snapshot.data.laConfigHolder.liveAppsConfig.applicationIds;
        this.uiAppId = this.route.snapshot.data.laConfigHolder.generalConfig.uiAppId;
        this.userId = this.route.snapshot.data.claims.userId;

        // Roles
        this.roles = this.route.snapshot.data.rolesHolder;
        this.displayRoles = this.roles.roles.filter(role => !role.configuration);
        this.currentRole = this.roleService.getCurrentRole();

        // Groups
        this.groups = this.route.snapshot.data.groupsHolder;

        // Buttons on the top bar
        this.toolbarButtons = this.createToolbarButtons();
        this.viewButtons = this.createViewButtons();
    }

    protected createToolbarButtons = (): ToolbarButton[] => {

        const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', this.roleService.amIConfigurator(this.roles) || this.groups.groups.find(group => group.name === "System: ADMINISTRATOR") != undefined, true);
        const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
        const buttons = [ configButton, refreshButton ];
        return buttons;
    }

    handleToolbarButtonEvent = (buttonId: string) => {
        if (buttonId === 'config') {
            this.router.navigate(['/starterApp/configuration/']);
        }
        if (buttonId === 'refresh') {
            this.refresh();
        }
    }

    protected createViewButtons = (): ToolbarButton[] => {
        const processMiningView = this.buttonsHelper.createButton('process-mining-view', '', true, 'Process Mining View', true, true);
        const caseView = this.buttonsHelper.createButton('case-view', '', true, 'Case View', true, true);
        const buttons = [  ];
        if (this.currentRole.display === 'Business Analyst'){
            buttons.push(processMiningView);
        }
        buttons.push(caseView);
        return buttons;
    }

    public handleViewButtonEvent = (event: MatButtonToggleChange) => {
        if (event.value != 'case-view'){
            this.router.navigate(['/starterApp/pd/process-mining-view']);
        }
        // this.processDiscovery.getCurrentDatasource().subscribe(
        //     datasource => {
                // this.router.navigate(['/starterApp/pd/process-mining-view']);
        //     }
        // )
    }

    clickCaseAction = ($event: any): void => {
        this.router.navigate(['/starterApp/case/' + $event.appId + '/' + $event.typeId + '/' + $event.caseRef], { });
    }

    public roleChange = ($role: RoleAttribute): void => {
        this.roleService.setCurrentRole($role);
        this.currentRole = this.roleService.getCurrentRole();
        this.viewButtons = this.createViewButtons();
    }
}
