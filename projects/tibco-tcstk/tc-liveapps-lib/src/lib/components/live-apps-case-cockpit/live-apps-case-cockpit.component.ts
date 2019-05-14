import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewChildren
} from '@angular/core';
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
import {ToolbarButton, TcButtonsHelperService} from '@tibco-tcstk/tc-core-lib';
import {LaProcessSelection} from '../../models/tc-case-processes';
import {MatTab, MatTabGroup} from '@angular/material';
import {QueryList} from '@angular/core';
import { RouteAction } from '@tibco-tcstk/tc-core-lib';
import {Roles, RouteAccessControlConfig} from '../../models/tc-groups-data';
import {TcRolesService} from '../../services/tc-roles-service.ts.service';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';


/**
 * High level component to allow interaction with case.
 *
 *@example <tcla-live-apps-case-cockpit></tcla-live-apps-case-cockpit>
 */
@Component({
  selector: 'tcla-live-apps-case-cockpit',
  templateUrl: './live-apps-case-cockpit.component.html',
  styleUrls: ['./live-apps-case-cockpit.component.css']
})
export class LiveAppsCaseCockpitComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('dataTabGroup') matTabGroup: MatTabGroup;
  @ViewChildren('dataTabs') inclusiveTabs: QueryList<MatTab>;
  @ContentChildren('projectedTab') tabsFromNgContent: QueryList<MatTab>;

  // this default layout displays all data but will hide buttons
  DEFAULT_CASE_DATA_LAYOUT = [
    '*',
    { type: 'submit', title: 'Save', condition: '1===2' },
    { type: 'actions', title: 'Hidden', condition: '1===2' }
  ];

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
  @Input() access: RouteAccessControlConfig;

  /**
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * Layout object that can be passed to override default layout of the form renderer
   */
  @Input() layout: any[] = this.layout ?  this.layout : this.DEFAULT_CASE_DATA_LAYOUT;


  /**
   * *##OUTPUT-RouteAction##
   * RouteAction object to tell caller to navigate somewhere
   */
  @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

// The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChild(LiveAppsCaseSummaryComponent) caseSummaryComponent: LiveAppsCaseSummaryComponent;
  @ViewChild(LiveAppsCaseDataComponent) caseDataComponent: LiveAppsCaseDataComponent;
  @ViewChild(LiveAppsCaseActionsComponent) caseActionsComponent: LiveAppsCaseActionsComponent;
  @ViewChild(LiveAppsCaseAuditComponent) caseAuditComponent: LiveAppsCaseAuditComponent;
  @ViewChild(LiveAppsDocumentsComponent) caseDocumentsComponent: LiveAppsDocumentsComponent;
  @ViewChild(LiveAppsNotesComponent) caseNotesComponent: LiveAppsNotesComponent;
  @ViewChild(LiveAppsCaseStatesComponent) caseStatesComponent: LiveAppsCaseStatesComponent;
  @ViewChild(LiveAppsCaseStateAuditComponent) caseStateAuditComponent: LiveAppsCaseStateAuditComponent;
  @ViewChild('dataTabGroup') dataTabGroups: MatTabGroup;

  isFavorite: boolean;
  valid = false;
  toolbarButtons: ToolbarButton[];
  actionSelection: LaProcessSelection;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  protected _destroyed$ = new Subject();
  protected errorMessage: string;

  constructor(protected liveapps: LiveAppsService, protected buttonsHelper: TcButtonsHelperService, private router: Router, protected rolesService: TcRolesService) {
  }

  protected createToolbarButtons = (): ToolbarButton[] => {
    const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', (this.access ? this.rolesService.checkButton('configure', this.roles, this.access) : true), true);
    const favButton = this.buttonsHelper.createButton('favorite', 'tcs-favorites-icon', this.isFavorite, 'Toggle Favorite', (this.access ? this.rolesService.checkButton('favorite', this.roles, this.access) : true), true);
    const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', (this.access ? this.rolesService.checkButton('refresh', this.roles, this.access) : true), true);
    const homeButton = this.buttonsHelper.createButton('close', 'tcs-close-icon', true, 'Close', true, true);
    const buttons = [ configButton, favButton, refreshButton, homeButton ];
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
      this.routeAction.emit(new RouteAction('backClicked', null));
    }
    if (buttonId === 'config') {
      this.routeAction.emit(new RouteAction('configClicked', null));
    }
  }

  public handleActionSelection = (actionSelection) => {
    this.actionSelection = actionSelection;
    this.caseActionsComponent.toggleEnable();
  }

  public actionTabCreated = (data) => {
    // the tab isn't actually it the tab-group at this point but this should still work as length is current tab + 1
    this.dataTabGroups.selectedIndex = this.dataTabGroups._tabs.length;
  }

  public handleCancelAction = () => {
    this.actionSelection = undefined;
    this.caseActionsComponent.toggleEnable();
  }

  public handleActionCompleted = (processId: string) => {
    this.actionSelection = undefined;
    this.caseActionsComponent.toggleEnable();
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
    if (this.caseStateAuditComponent) {
      this.caseStateAuditComponent.refresh();
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
      // dont set recent if it is in the exclude app list
      if (!this.exclRecentAppIds || (this.exclRecentAppIds.indexOf(this.appId) === -1)) {
        this.liveapps.setRecentCase(this.caseRef, this.uiAppId, this.sandboxId);
      }
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

  ngAfterViewInit(): void {
    this.matTabGroup._tabs.reset([...this.inclusiveTabs.toArray(), ...this.tabsFromNgContent.toArray()]);
    // this.matTabGroup.afterViewInit();
  }
}
