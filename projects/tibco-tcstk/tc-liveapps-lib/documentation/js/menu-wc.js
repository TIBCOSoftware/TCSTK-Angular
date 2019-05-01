'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">@tibco-tcstk/tc-liveapps-lib documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/TcLiveappsLibModule.html" data-type="entity-link">TcLiveappsLibModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TcLiveappsLibModule-37f45ef8b688ff0fbd8fbb4354dbe433"' : 'data-target="#xs-components-links-module-TcLiveappsLibModule-37f45ef8b688ff0fbd8fbb4354dbe433"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TcLiveappsLibModule-37f45ef8b688ff0fbd8fbb4354dbe433"' :
                                            'id="xs-components-links-module-TcLiveappsLibModule-37f45ef8b688ff0fbd8fbb4354dbe433"' }>
                                            <li class="link">
                                                <a href="components/LiveAppsActionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsActionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsAppConfigurationWidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsAppConfigurationWidgetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsApplicationConfigurationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsApplicationConfigurationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsApplicationCreateButtonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsApplicationCreateButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsApplicationListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsApplicationListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsApplicationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsApplicationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseActionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseActionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseActionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseActionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseActionsListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseActionsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseAuditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseAuditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseCockpitComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseCockpitComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseCreatorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseCreatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseCreatorWidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseCreatorWidgetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseCreatorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseCreatorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseDataComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseDataDisplayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseDataDisplayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseOverviewReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseOverviewReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseSchemaListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseSchemaListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseStateAuditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseStateAuditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseStatesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseStatesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseSummaryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseSummaryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCaseTypeOverviewReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCaseTypeOverviewReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCreatorDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCreatorDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCreatorSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCreatorSelectorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsCreatorsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsCreatorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsDocumentUploadDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsDocumentUploadDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsDocumentViewerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsDocumentViewerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsDocumentViewerDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsDocumentViewerDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsDocumentsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsDocumentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsFavoriteCasesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsFavoriteCasesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsHomeCockpitComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsHomeCockpitComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsLandingPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsLandingPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsLoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsLoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsMilestoneComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsMilestoneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsNotesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsNotesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsNotesEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsNotesEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsPieComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsPieComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsRecentCasesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsRecentCasesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsReportingCockpitComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsReportingCockpitComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsRoleSwitcherComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsRoleSwitcherComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsSandboxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsSandboxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsSearchWidgetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsSearchWidgetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsSettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsSettingsRecentCasesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsSettingsRecentCasesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsSettingsRolesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsSettingsRolesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsSettingsSummaryCardsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsSettingsSummaryCardsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsStateIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsStateIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiveAppsStateIconUploadDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiveAppsStateIconUploadDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-TcLiveappsLibModule-37f45ef8b688ff0fbd8fbb4354dbe433"' : 'data-target="#xs-pipes-links-module-TcLiveappsLibModule-37f45ef8b688ff0fbd8fbb4354dbe433"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-TcLiveappsLibModule-37f45ef8b688ff0fbd8fbb4354dbe433"' :
                                            'id="xs-pipes-links-module-TcLiveappsLibModule-37f45ef8b688ff0fbd8fbb4354dbe433"' }>
                                            <li class="link">
                                                <a href="pipes/ParseAuditMessagePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ParseAuditMessagePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiResponseError.html" data-type="entity-link">ApiResponseError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiResponseText.html" data-type="entity-link">ApiResponseText</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuditEvent.html" data-type="entity-link">AuditEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuditEventAttribute.html" data-type="entity-link">AuditEventAttribute</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuditEventList.html" data-type="entity-link">AuditEventList</a>
                            </li>
                            <li class="link">
                                <a href="classes/CardConfig.html" data-type="entity-link">CardConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseAction.html" data-type="entity-link">CaseAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseActionsList.html" data-type="entity-link">CaseActionsList</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseAttribute.html" data-type="entity-link">CaseAttribute</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseCardConfig.html" data-type="entity-link">CaseCardConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseCreator.html" data-type="entity-link">CaseCreator</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseCreatorSelectionContext.html" data-type="entity-link">CaseCreatorSelectionContext</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseCreatorsList.html" data-type="entity-link">CaseCreatorsList</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseInfo.html" data-type="entity-link">CaseInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseInfoList.html" data-type="entity-link">CaseInfoList</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseInfoWithSchema.html" data-type="entity-link">CaseInfoWithSchema</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseList.html" data-type="entity-link">CaseList</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseRoute.html" data-type="entity-link">CaseRoute</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseSearchResults.html" data-type="entity-link">CaseSearchResults</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseType.html" data-type="entity-link">CaseType</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTypeReportRecord.html" data-type="entity-link">CaseTypeReportRecord</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTypeReportRecordInfo.html" data-type="entity-link">CaseTypeReportRecordInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTypesList.html" data-type="entity-link">CaseTypesList</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTypesReport.html" data-type="entity-link">CaseTypesReport</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTypeState.html" data-type="entity-link">CaseTypeState</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTypeStateReport.html" data-type="entity-link">CaseTypeStateReport</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTypeStateReportRecord.html" data-type="entity-link">CaseTypeStateReportRecord</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTypeStateReportStateInfo.html" data-type="entity-link">CaseTypeStateReportStateInfo</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTypeStatesList.html" data-type="entity-link">CaseTypeStatesList</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaseTypeStatesListList.html" data-type="entity-link">CaseTypeStatesListList</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocTags.html" data-type="entity-link">DocTags</a>
                            </li>
                            <li class="link">
                                <a href="classes/Document.html" data-type="entity-link">Document</a>
                            </li>
                            <li class="link">
                                <a href="classes/DocumentList.html" data-type="entity-link">DocumentList</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link">Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/Groups.html" data-type="entity-link">Groups</a>
                            </li>
                            <li class="link">
                                <a href="classes/IconMap.html" data-type="entity-link">IconMap</a>
                            </li>
                            <li class="link">
                                <a href="classes/JsonSchema.html" data-type="entity-link">JsonSchema</a>
                            </li>
                            <li class="link">
                                <a href="classes/LaProcessSelection.html" data-type="entity-link">LaProcessSelection</a>
                            </li>
                            <li class="link">
                                <a href="classes/LiveAppsConfig.html" data-type="entity-link">LiveAppsConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/LiveAppsConfigHolder.html" data-type="entity-link">LiveAppsConfigHolder</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginContext.html" data-type="entity-link">LoginContext</a>
                            </li>
                            <li class="link">
                                <a href="classes/Metadata.html" data-type="entity-link">Metadata</a>
                            </li>
                            <li class="link">
                                <a href="classes/Note.html" data-type="entity-link">Note</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotesList.html" data-type="entity-link">NotesList</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotesRole.html" data-type="entity-link">NotesRole</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoteThread.html" data-type="entity-link">NoteThread</a>
                            </li>
                            <li class="link">
                                <a href="classes/Notification.html" data-type="entity-link">Notification</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationCollection.html" data-type="entity-link">NotificationCollection</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationList.html" data-type="entity-link">NotificationList</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrgFolder.html" data-type="entity-link">OrgFolder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Process.html" data-type="entity-link">Process</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProcessId.html" data-type="entity-link">ProcessId</a>
                            </li>
                            <li class="link">
                                <a href="classes/PurgeResult.html" data-type="entity-link">PurgeResult</a>
                            </li>
                            <li class="link">
                                <a href="classes/Roles.html" data-type="entity-link">Roles</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouteAccessControlConfig.html" data-type="entity-link">RouteAccessControlConfig</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouteAccessDef.html" data-type="entity-link">RouteAccessDef</a>
                            </li>
                            <li class="link">
                                <a href="classes/StateAuditEvent.html" data-type="entity-link">StateAuditEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/StateAuditEventList.html" data-type="entity-link">StateAuditEventList</a>
                            </li>
                            <li class="link">
                                <a href="classes/StateTracker.html" data-type="entity-link">StateTracker</a>
                            </li>
                            <li class="link">
                                <a href="classes/StateTrackerData.html" data-type="entity-link">StateTrackerData</a>
                            </li>
                            <li class="link">
                                <a href="classes/Thread.html" data-type="entity-link">Thread</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThreadList.html" data-type="entity-link">ThreadList</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrackerState.html" data-type="entity-link">TrackerState</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInfo.html" data-type="entity-link">UserInfo</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LiveAppsService.html" data-type="entity-link">LiveAppsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcCaseAuditService.html" data-type="entity-link">TcCaseAuditService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcCaseCardConfigService.html" data-type="entity-link">TcCaseCardConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcCaseDataService.html" data-type="entity-link">TcCaseDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcCaseProcessesService.html" data-type="entity-link">TcCaseProcessesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcCaseStatesService.html" data-type="entity-link">TcCaseStatesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcDocumentService.html" data-type="entity-link">TcDocumentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcLiveAppsConfigService.html" data-type="entity-link">TcLiveAppsConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcLiveAppsReportingService.html" data-type="entity-link">TcLiveAppsReportingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TcRolesService.html" data-type="entity-link">TcRolesService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AllGroupsResolver.html" data-type="entity-link">AllGroupsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/AllRolesResolver.html" data-type="entity-link">AllRolesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/CaseGuard.html" data-type="entity-link">CaseGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ClaimsResolver.html" data-type="entity-link">ClaimsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/GroupsResolver.html" data-type="entity-link">GroupsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/LaConfigResolver.html" data-type="entity-link">LaConfigResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/LiveAppsConfigResolver.html" data-type="entity-link">LiveAppsConfigResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link">RoleGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesResolver.html" data-type="entity-link">RolesResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});