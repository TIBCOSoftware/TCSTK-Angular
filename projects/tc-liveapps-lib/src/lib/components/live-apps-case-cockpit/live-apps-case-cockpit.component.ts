import {Component, Directive, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LiveAppsCaseActionsComponent} from '../live-apps-case-actions/live-apps-case-actions.component';
import {LiveAppsCaseAuditComponent} from '../live-apps-case-audit/live-apps-case-audit.component';
import {LiveAppsCaseDataComponent} from '../live-apps-case-data/live-apps-case-data.component';
import {LiveAppsCaseStateAuditComponent} from '../live-apps-case-state-audit/live-apps-case-state-audit.component';
import {LiveAppsCaseStatesComponent} from '../live-apps-case-states/live-apps-case-states.component';
import {LiveAppsDocumentsComponent} from '../live-apps-documents/live-apps-documents.component';
import {LiveAppsNotesComponent} from '../live-apps-notes/live-apps-notes.component';
import {LiveAppsCaseSummaryComponent} from '../live-apps-case-summary/live-apps-case-summary.component';
import {LiveAppsService} from '../../services/live-apps.service';
import {ToolbarButton, TcButtonsHelperService} from 'tc-core-lib';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {MatTab, MatTabGroup} from '@angular/material';
import {QueryList} from '@angular/core';
import { OnCreateDirective} from 'tc-core-lib';

@Component({
  selector: 'tcla-live-apps-case-cockpit',
  templateUrl: './live-apps-case-cockpit.component.html',
  styleUrls: ['./live-apps-case-cockpit.component.css']
})
export class LiveAppsCaseCockpitComponent implements OnInit, OnDestroy {
  @Input() uiAppId;
  @Input() appId;
  @Input() typeId;
  @Input() sandboxId;
  @Input() caseRef;
  @Input() userId;
  @Input() closeRoute;

// The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChild(LiveAppsCaseSummaryComponent) caseSummaryComponent: LiveAppsCaseSummaryComponent;
  @ViewChild(LiveAppsCaseDataComponent) caseDataComponent: LiveAppsCaseDataComponent;
  @ViewChild(LiveAppsCaseStatesComponent) caseStatesComponent: LiveAppsCaseStatesComponent;
  @ViewChild(LiveAppsCaseActionsComponent) caseActionsComponent: LiveAppsCaseActionsComponent;
  @ViewChild(LiveAppsCaseAuditComponent) caseAuditComponent: LiveAppsCaseAuditComponent;
  @ViewChild(LiveAppsCaseStateAuditComponent) caseStateAuditComponent: LiveAppsCaseStateAuditComponent;
  @ViewChild(LiveAppsDocumentsComponent) caseDocumentsComponent: LiveAppsDocumentsComponent;
  @ViewChild(LiveAppsNotesComponent) caseNotesComponent: LiveAppsNotesComponent;
  @ViewChild('dataTabGroup') dataTabGroups: MatTabGroup;

  isFavorite: boolean;
  valid = false;
  toolbarButtons: ToolbarButton[];
  actionSelection: LaProcessSelection;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  protected _destroyed$ = new Subject();
  protected errorMessage: string;

  constructor(protected liveapps: LiveAppsService, protected buttonsHelper: TcButtonsHelperService, private router: Router) {
  }

  protected createToolbarButtons = (): ToolbarButton[] => {
    const favButton = this.buttonsHelper.createButton('favorite', 'tcs-favorites-icon', this.isFavorite, 'Toggle Favorite', true, true);
    const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
    const homeButton = this.buttonsHelper.createButton('close', 'tcs-close-icon', true, 'Close', true, true);
    const buttons = [ favButton, refreshButton, homeButton ];
    return buttons;
  }

  public handleToolbarButtonEvent = (buttonId: string) => {
    if (buttonId === 'favorite') {
      this.toggleFavorite();
    }
    if (buttonId === 'refresh') {
      this.refresh();
    }
    if (buttonId === 'close') {
      this.router.navigate([this.closeRoute], {queryParams: {} });
    }
  }

  public handleActionSelection = (actionSelection) => {
    this.actionSelection = actionSelection;
  }

  public actionTabCreated = (data) => {
    // the tab isn't actually it the tab-group at this point but this should still work as length is current tab + 1
    this.dataTabGroups.selectedIndex = this.dataTabGroups._tabs.length;
  }

  public handleCancelAction = () => {
    this.actionSelection = undefined;
  }

  public handleActionCompleted = (processId: string) => {
    this.actionSelection = undefined;
    // to allow case to update async before we refresh
    setTimeout(() => {
      this.refresh();
    }, 1000);
  }

  public refresh = () => {
    if (this.caseSummaryComponent) {
      this.caseSummaryComponent.refresh();
    }
    if (this.caseDataComponent) {
      this.caseDataComponent.refresh();
    }
    if (this.caseStatesComponent) {
      this.caseStatesComponent.refresh();
    }
    if (this.caseActionsComponent) {
      this.caseActionsComponent.refresh();
    }
    if (this.caseAuditComponent) {
      this.caseAuditComponent.refresh();
    }
    if (this.caseStatesComponent) {
      this.caseStatesComponent.refresh();
    }
    if (this.caseDocumentsComponent) {
      this.caseDocumentsComponent.refresh();
    }
    if (this.caseNotesComponent) {
      this.caseNotesComponent.refresh();
    }
  }

  public toggleFavorite = () => {
    this.liveapps.setFavoriteCase(this.caseRef, this.uiAppId, this.sandboxId);
    this.isFavorite = !this.isFavorite;
    const updatedFavButton = this.buttonsHelper.createButton(
      'favorite', 'tcs-favorites-icon', this.isFavorite, 'Toggle Favorite', true, true);
    this.toolbarButtons = this.buttonsHelper.updateButtons([updatedFavButton], this.toolbarButtons);
  }

  ngOnInit() {
    if (!isNaN(Number(this.caseRef))) {
      this.liveapps.setRecentCase(this.caseRef, this.uiAppId, this.sandboxId);
      this.valid = true;
    }
    this.liveapps.isFavoriteCase(this.caseRef, this.uiAppId, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          this.isFavorite = result;
          this.toolbarButtons = this.createToolbarButtons();
          return result;
        })
      )
      .subscribe(
        null, error => {
          this.errorMessage = 'Error retrieving isFavorite: ' + error.error.errorMsg;
        }
      );
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }
}
