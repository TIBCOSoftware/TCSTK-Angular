import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteAccessControlConfig, RouteAccessControlConfigurationElement, Roles } from '../../models/tc-groups-data';
import { TcAccessControlService } from '../../services/tc-access-control.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'tcla-live-apps-settings-access-control',
    templateUrl: './live-apps-settings-access-control.component.html',
    styleUrls: ['./live-apps-settings-access-control.component.css']
})
export class LiveAppsSettingsAccessControlComponent implements OnInit {
    displayedColumns: string[] = [];
    dataSource = [];

    private accessControlConfiguration: RouteAccessControlConfig;
     allRoles: Roles;

    isGroup(index, item): boolean {
        return item.isGroupBy;
    }

    constructor(
        private route: ActivatedRoute,
        private accessControlService: TcAccessControlService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.accessControlConfiguration = this.route.snapshot.data.accessControlConfigHolder;
        this.allRoles = this.route.snapshot.data.allRoles;
        this.generateTables();
    }

    runSaveFunction() {
        this.accessControlConfiguration.configuration = [];
        for (const role of this.allRoles.roles){
            let userConfiguration = this.dataSource.filter(entry => entry[role.id]);
            let routes = userConfiguration.filter(row => row.type === 'route').map(element => element.name);
            let buttonIds = userConfiguration.filter(row => row.type === 'button').map(element => element.name);
            this.accessControlConfiguration.configuration.push(
                new RouteAccessControlConfigurationElement().deserialize({'roleId': role.id, routes: routes, buttonIds: buttonIds})
            )
        }

        this.accessControlService.updateAccessControlConfig(Number(this.route.snapshot.data.claims.primaryProductionSandbox.id).valueOf(), this.accessControlConfiguration.uiAppId, this.accessControlConfiguration, this.accessControlConfiguration.id).subscribe(
            result => {
                this.snackBar.open('Access Control configuration saved', 'OK', {
                    duration: 3000
                });
            },
            error => {
                this.snackBar.open('Error saving Access Control configuration saved', 'OK', {
                    duration: 3000
                });
            }
        );




    }

    private generateTables = (): void => {
        this.displayedColumns = ['name']; 
        this.allRoles.roles.forEach(role => {
            this.displayedColumns.push(role.id);
        });

        // Create in dataSource all rows with the appropriate order
        this.dataSource.push({ initial: 'Routes', isGroupBy: true });
        this.accessControlConfiguration.allowedRoutes.forEach(route => this.dataSource.push({name: route, type: 'route'}));
        
        this.dataSource.push({ initial: 'Buttons', isGroupBy: true });
        this.accessControlConfiguration.allowedButtonIds.forEach(buttonId => this.dataSource.push({ name: buttonId, type: 'button' }));

        // Update the dataSource with the previous configuration
        this.accessControlConfiguration.configuration.forEach(configElement => {
            // Routes
            configElement.routes.forEach(configRoute => {
                let row = this.dataSource.filter(entry => entry.name === configRoute)[0];
                row[configElement.roleId] = true;
            })

            // ButtonsIds
            configElement.buttonIds.forEach(configRoute => {
                let row = this.dataSource.filter(entry => entry.name === configRoute)[0];
                row[configElement.roleId] = true;
            })
        });

    }

    public isSelected = (row, role): boolean => {
        return row[role];
    }

    public toggle = (row, role: string) => {
        let dsRow = this.dataSource.filter(entry => entry.name === row.name)[0];

        if (dsRow[role]) {
            delete dsRow[role];
        } else {
            dsRow[role] = true;
        }
    }
}
