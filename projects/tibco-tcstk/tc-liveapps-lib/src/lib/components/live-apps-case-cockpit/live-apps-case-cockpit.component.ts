import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive, ElementRef,
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
import {MatTab, MatTabChangeEvent, MatTabGroup} from '@angular/material';
import {QueryList} from '@angular/core';
import { RouteAction } from '@tibco-tcstk/tc-core-lib';
import {Roles, RouteAccessControlConfig, RouteAccessControlConfigurationElement} from '../../models/tc-groups-data';
import {TcRolesService} from '../../services/tc-roles-service.ts.service';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {LiveAppsLegacyFormComponent} from '../live-apps-legacy-form/live-apps-legacy-form.component';
import {CaseAction, FormTab} from '../../models/liveappsdata';
import {FormControl} from '@angular/forms';

/**
 * High level component to allow interaction with case.
 *
 *  ![alt-text](../live-apps-case-cockpit.png "Image")
 *
 *@example <tcla-live-apps-case-cockpit></tcla-live-apps-case-cockpit>
 */
@Component({
  selector: 'tcla-live-apps-case-cockpit',
  templateUrl: './live-apps-case-cockpit.component.html',
  styleUrls: ['./live-apps-case-cockpit.component.css']
})
export class LiveAppsCaseCockpitComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('contextTabGroup', {static: false}) matTabGroup: MatTabGroup;
  @ViewChildren('contextTabs') inclusiveTabs: QueryList<MatTab>;
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
   * Custom Form configuration file
   */
  @Input() customFormDefs: CustomFormDefs;

  /**
   * Layout object that can be passed to override default layout of the form renderer
   */
  @Input() layout: any[] = this.layout ?  this.layout : this.DEFAULT_CASE_DATA_LAYOUT;

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

// The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChild(LiveAppsCaseSummaryComponent, {static: false}) caseSummaryComponent: LiveAppsCaseSummaryComponent;
  @ViewChild(LiveAppsCaseDataComponent, {static: false}) caseDataComponent: LiveAppsCaseDataComponent;
  @ViewChild(LiveAppsCaseActionsComponent, {static: false}) caseActionsComponent: LiveAppsCaseActionsComponent;
  @ViewChild(LiveAppsCaseAuditComponent, {static: false}) caseAuditComponent: LiveAppsCaseAuditComponent;
  @ViewChild(LiveAppsDocumentsComponent, {static: false}) caseDocumentsComponent: LiveAppsDocumentsComponent;
  @ViewChild(LiveAppsNotesComponent, {static: false}) caseNotesComponent: LiveAppsNotesComponent;
  @ViewChild(LiveAppsCaseStatesComponent, {static: false}) caseStatesComponent: LiveAppsCaseStatesComponent;
  @ViewChild(LiveAppsCaseStateAuditComponent, {static: false}) caseStateAuditComponent: LiveAppsCaseStateAuditComponent;
  @ViewChild(LiveAppsLegacyFormComponent, {static: false}) workitemComponent: LiveAppsLegacyFormComponent;
  @ViewChild('dataTabGroup', {static: false}) dataTabGroups: MatTabGroup;
  @ViewChild('dataTabGroup', {static: false}) dataTabGroupEl: ElementRef;

  isFavorite: boolean;
  valid = false;
  toolbarButtons: ToolbarButton[] = [];
  incConfigButton = true;
  incFavButton = true;
  incRefreshButton = true;
  incHomeButton = true;
  formTabs: FormTab[] = [];
  selectedTab: FormTab;
  actionVisible = false;
  selected = new FormControl(0);

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  protected _destroyed$ = new Subject();
  protected errorMessage: string;

  constructor(protected liveapps: LiveAppsService, protected buttonsHelper: TcButtonsHelperService, protected router: Router, protected rolesService: TcRolesService) {
  }

  protected createToolbarButtons = (): ToolbarButton[] => {
    const buttons = [];
    if (this.incConfigButton) {
      const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', (this.access ? this.rolesService.checkButton('configure', this.access) : true), true);
      buttons.push(configButton);
    }
    if (this.incFavButton) {
      const favButton = this.buttonsHelper.createButton('favorite', 'tcs-favorites-icon', this.isFavorite, 'Toggle Favorite', (this.access ? this.rolesService.checkButton('favorite', this.access) : true), true);
      buttons.push(favButton);
    }
    if (this.incRefreshButton) {
      const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', (this.access ? this.rolesService.checkButton('refresh', this.access) : true), true);
      buttons.push(refreshButton);
    }
    if (this.incHomeButton) {
      const homeButton = this.buttonsHelper.createButton('close', 'tcs-close-icon', true, 'Close', true, true);
      buttons.push(homeButton);
    }
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

  public handleActionSelection = (actionSelection: LaProcessSelection) => {
    // this.caseActionsComponent.toggleEnable();
    // this.actionSelection = actionSelection;
    this.addActionFormTab(actionSelection);
  }

  public handleActionCompleted = (formTab: FormTab) => {
    this.caseActionsComponent.toggleEnable();
    this.formTabs.splice(this.formTabs.findIndex(tab => {
      return tab.type === 'actionTab' && tab.action === formTab.action;
    }), 1);
    this.selected.setValue(0);
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

  public handleWorkitemComplete = (wiId) => {
    this.formTabs.splice(this.formTabs.findIndex(tab => {
      return tab.type === 'wiTab' && tab.workitemId === wiId;
    }), 1);
    this.selected.setValue(0);
    setTimeout(() => {
      this.refresh();
    }, 1000);
  }

  public handleTabCancel = (formTab: FormTab) => {
    if (formTab.type === 'wiTab') {
      this.workitemComponent.cancelWi(formTab.workitemId);
      this.formTabs.splice(this.formTabs.findIndex(tab => {
        return tab.type === 'wiTab' && tab.workitemId === tab.workitemId;
      }), 1);

      // if we are closing the selected tab then switch to the first tab
      const currentTabIdx = this.dataTabGroups._tabs.toArray().findIndex(tab => {
        return tab.textLabel === 'wiTab';
      });
      if (currentTabIdx === this.dataTabGroups.selectedIndex) {
        this.selected.setValue(0);
      }
    } else if (formTab.type === 'actionTab') {
      this.formTabs.splice(this.formTabs.findIndex(tab => {
        return tab.type === 'actionTab' && tab.action === formTab.action;
      }), 1);
      // if we are closing the selected tab then switch to the first tab
      const currentTabIdx = this.dataTabGroups._tabs.toArray().findIndex(tab => {
        return tab.textLabel === 'actionTab';
      });
      if (currentTabIdx === this.dataTabGroups.selectedIndex) {
        this.selected.setValue(0);
      }
      this.caseActionsComponent.toggleEnable();
    }
  }

  public addWiFormTab = (wiId) => {
      this.formTabs.push(
        new FormTab().deserialize({
          type: 'wiTab',
          title: 'WorkItem: ' + wiId,
          workitemId: wiId
        }));
      this.selected.setValue(this.formTabs.length);
  }

  public addActionFormTab = (actionSelection: LaProcessSelection) => {
    const newTab = new FormTab().deserialize({
      type: 'actionTab',
      title: 'Action: ' + actionSelection.process.name,
      workitemId: undefined,
      action: actionSelection
    });
    this.formTabs.push(newTab);
    this.selectedTab = newTab;
    setTimeout(handler => {
      this.selected.setValue(this.formTabs.length);
    })
    this.caseActionsComponent.toggleEnable();
  }

  handleTabChange = (tabChange: MatTabChangeEvent) => {
    if (tabChange.tab.textLabel === 'actionTab') {
      document.getElementById('dataTabGroup').style.height = '0px';
      setTimeout(handler => {
        this.actionVisible = true;
      });
    } else {
      document.getElementById('dataTabGroup').style.height = '100%';
      this.actionVisible = false;
    }
  }

  ngOnInit() {
    if (!isNaN(Number(this.caseRef))) {
      // dont set recent if it is in the exclude app list
      if (!this.exclRecentAppIds || (this.exclRecentAppIds.indexOf(this.appId) === -1)) {
        this.liveapps.setRecentCase(this.caseRef, this.uiAppId, this.sandboxId);
      }
      this.valid = true;
    }
    if (this.incFavButton) {
      this.liveapps.isFavoriteCase(this.caseRef, this.uiAppId, this.sandboxId)
        .pipe(
          take(1),
          takeUntil(this._destroyed$)
        )
        .subscribe(
          result => {
            this.isFavorite = result;
            this.toolbarButtons = this.toolbarButtons.concat(this.createToolbarButtons());
            return result;
          }, error => {
            this.errorMessage = 'Error retrieving isFavorite: ' + error.error.errorMsg;
          }
        );
    } else {
      this.toolbarButtons = this.toolbarButtons.concat(this.createToolbarButtons());
    }
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

  ngAfterViewInit(): void {
    this.matTabGroup._tabs.reset([...this.inclusiveTabs.toArray(), ...this.tabsFromNgContent.toArray()]);
    // this.matTabGroup.afterViewInit();

    if (this.workitemId) {
      this.addWiFormTab(this.workitemId);
    }
  }
}
