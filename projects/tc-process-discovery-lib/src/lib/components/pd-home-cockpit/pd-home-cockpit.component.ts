import { Component, Output, Input, EventEmitter } from '@angular/core';
import { LiveAppsHomeCockpitComponent, CaseType, LiveAppsCreatorDialogComponent, CaseCreatorSelectionContext } from 'tc-liveapps-lib';
import { RouteAction, ToolbarButton, TcButtonsHelperService } from 'tc-core-lib';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CaseRoute } from 'tc-liveapps-lib/public_api';
import { Location } from '@angular/common';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';

@Component({
  selector: 'tcpd-pd-home-cockpit',
  templateUrl: './pd-home-cockpit.component.html',
  styleUrls: ['./pd-home-cockpit.component.css']
})
export class PdHomeCockpitComponent extends LiveAppsHomeCockpitComponent {

    public viewButtons;
    @Input() selectedOption: string;
    private selectedVariant: string;
    private selectedVariantID: string;

    constructor(private location: Location, private router: Router, protected buttonsHelper: TcButtonsHelperService, public dialog: MatDialog, private processDiscovery: PdProcessDiscoveryService) {
        super(buttonsHelper, dialog);
    }

    ngOnInit() {
        super.ngOnInit();
        this.viewButtons = this.createViewButtons();
        this.processDiscovery.dataStr.subscribe(
            data => {
                this.selectedVariant = data.comment;
                this.selectedVariantID = data.cases;
                console.log("Seeting values: " + this.selectedVariant + " - " + this.selectedVariantID);
            }
        )
    }

    protected createToolbarButtons = (): ToolbarButton[] => {
        const changeDatasourceButton = this.buttonsHelper.createButton('changedatasource', 'tcs-config-icon', true, 'Change datasource', true, true);
        const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, true);
        const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
        const buttons = [ changeDatasourceButton, configButton, refreshButton ];
        return buttons;
    }

    public handleToolbarButtonEvent = (buttonId: string) => {
        if (buttonId === 'changedatasource'){
            this.routeAction.emit(new RouteAction('changedatasourceClicked', null));
        }
        if (buttonId === 'config') {
          this.routeAction.emit(new RouteAction('configClicked', null));
        }
        if (buttonId === 'refresh') {
          this.refresh();
        }
      }

      protected createViewButtons = (): ToolbarButton[] => {
        const processMiningView = this.buttonsHelper.createButton('process-mining-view', '', true, 'Process Mining View', true, true);
        const caseView = this.buttonsHelper.createButton('case-view', '', true, 'Case View', true, true);
        const buttons = [ processMiningView, caseView ];
        return buttons;
    }

  
     public handleViewButtonEvent = (event: MatButtonToggleChange) => {
         this.routeAction.emit(new RouteAction('changeViewClicked', event.value));
    }
  
    public handleCreatorAppSelection = (application: CaseType): void => {
        console.log("****** trying to start a creator");
        const EXAMPLE_INITIAL_DATA = {
            DiscoverCompliance: {
                Type: 'Compliance',
                ShortDescription: this.selectedVariant,
                Context: {
                    ContextType: 'Case',
                    ContextID: this.selectedVariantID
                }
            }

        };
        this.openCreatorDialog(application, EXAMPLE_INITIAL_DATA, this.sandboxId);    
    }

    openCreatorDialog = (application: CaseType, initialData, sandboxId) => {
        const dialogRef = this.dialog.open(LiveAppsCreatorDialogComponent, {
            width: '60%',
            height: '80%',
            maxWidth: '100vw',
            maxHeight: '100vh',
            panelClass: 'tcs-style-dialog',
            data: new CaseCreatorSelectionContext(application, initialData, sandboxId)
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(result);
                this.router.navigate(['/starterApp/case/' + result.appId + '/' + result.typeId + '/' + result.caseRef], {});
            }
        });
    }
}
