import { Component, OnInit } from '@angular/core';
import { TibcoCloudSettingsGeneralComponent, RoleAttribute, TcGeneralConfigService, TibcoCloudNewElementComponent } from '@tibco-tcstk/tc-core-lib';
import { Groups, Roles } from '../../models/tc-groups-data';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
    selector: 'tcla-live-apps-settings-roles',
    templateUrl: './live-apps-settings-roles.component.html',
    styleUrls: ['./live-apps-settings-roles.component.css']
})
export class LiveAppsSettingsRolesComponent extends TibcoCloudSettingsGeneralComponent implements OnInit {

    public roles: Roles;
    public groups: Groups;

    public currentRole: RoleAttribute;

    constructor(protected route: ActivatedRoute, protected generalConfigService: TcGeneralConfigService, protected snackBar: MatSnackBar, private dialog: MatDialog) {
        super(route, generalConfigService, snackBar);
    }

    ngOnInit() {
        this.generalConfig = super.getRoute().snapshot.data.generalConfigHolder;
        this.roles = super.getRoute().snapshot.data.allRoles;
        this.groups = super.getRoute().snapshot.data.allGroups;
        this.claims = super.getRoute().snapshot.data.claims;
        this.sandboxId = Number(this.claims.primaryProductionSandbox.id).valueOf();
    }

    deleteRoleFunction = (): void => {
        this.generalConfig.roles = this.generalConfig.roles.filter(element => element.id != this.currentRole.id);
    }

    selectedRole = (role: RoleAttribute): void => {
        this.currentRole = role;
    }

    createRoleFunction = (): void => {
        const dialogRef = this.dialog.open(TibcoCloudNewElementComponent, {
            width: '50%',
            height: '30%',
            maxWidth: '100vw',
            maxHeight: '100vh',
            panelClass: 'tcs-style-dialog',
            data: { resourceType: 'Role' }

        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const newRole = new RoleAttribute().deserialize({id: result.id, display: result.name });
                this.generalConfig.roles.push(newRole);
            }
        });
    }
}
