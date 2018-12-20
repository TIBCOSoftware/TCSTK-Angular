import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {LiveAppsService} from '../../../services/live-apps.service';
import {AppConfig, CaseTypeState, IconMap} from '../../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {LiveAppsCaseDataComponent} from '../live-apps-case-data/live-apps-case-data.component';
import {LiveAppsStateIconComponent} from '../live-apps-state-icon/live-apps-state-icon.component';
import {LiveAppsCaseSummaryComponent} from '../live-apps-case-summary/live-apps-case-summary.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LiveAppsDocumentUploadDialogComponent} from '../live-apps-documents/live-apps-documents.component';

@Component({
  selector: 'app-live-apps-application-configuration',
  templateUrl: './live-apps-application-configuration.component.html',
  styleUrls: ['./live-apps-application-configuration.component.css']
})
export class LiveAppsApplicationConfigurationComponent implements OnInit, OnDestroy {
  // The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChildren('iconcomp') stateIconComponents: QueryList<LiveAppsStateIconComponent>;
  @ViewChildren(LiveAppsCaseSummaryComponent) caseSummaryComponent: QueryList<LiveAppsCaseSummaryComponent>;

  @Input() appId: string;
  @Input() appTypeLabel: string;
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() folderId: string;
  @Output() configChanged = new EventEmitter();

  private states: CaseTypeState[];
  private errorMessage: string;
  private appStateConfig: AppConfig;
  private selectedStateConfig: IconMap;
  private caseTypeIcon: string;
  private caseTypeColor: string;

  private DEFAULT_CASE_TYPE_ICON = 'assets/icons/ic-generic-casetype.svg';
  private DEFAULT_CASE_TYPE_COLOR = '#8197c0';
  private DEFAULT_CASE_STATE_ICON = 'assets/icons/ic-generic-state.svg';
  private DEFAULT_CASE_STATE_COLOR = '#8197c0';
  private DEFAULT_COLOR_PALETTE = [
    '#3E94C0', '#49B3D3', '#76C6CF', '#A9DACD', '#DCECC9',
    '#FFAB40', '#FFD180', '#FFE0B2', '#FFF3E0', '#81D4FA',
    '#B3E5FC', '#8AF2F2', '#91A3AE', '#CED8DD', '#EBEFF1',
    '#6A1B9A', '#AD1457', '#EC407A', '#C4469E', '#BA68C8',
    '#8C9EFF', '#FF8A80', '#546F7A', '#263237'
  ];

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  private getConfigForState = (state: CaseTypeState): IconMap => {
    let reqIconMap: IconMap;
    this.appStateConfig.stateMap.forEach((stateMap) => {
      if (stateMap.state === state.value) {
        reqIconMap = stateMap;
      }
    });
    return reqIconMap ? reqIconMap : new IconMap(false, state.value, this.DEFAULT_CASE_STATE_COLOR, this.DEFAULT_CASE_STATE_ICON);
  }

  private getConfigForCaseType = (caseTypeId: string): IconMap => {
    let reqIconMap: IconMap;
    this.appStateConfig.stateMap.forEach((stateMap) => {
      if (stateMap.state === caseTypeId) {
        reqIconMap = stateMap;
      }
    });
    return reqIconMap ? reqIconMap : new IconMap(true, caseTypeId, this.DEFAULT_CASE_TYPE_COLOR, this.DEFAULT_CASE_TYPE_ICON);
  }

  private updateIconMap = (stateConfig: IconMap) => {
    let foundMap: IconMap;
    this.appStateConfig.stateMap.forEach((stateMap) => {
      if (stateMap.state === stateConfig.state) {
        foundMap = stateMap;
      }
    });
    if (foundMap) {
      foundMap = stateConfig;
    } else {
      this.appStateConfig.stateMap.push(stateConfig);
    }
  }

  private setFill = (fill, stateConfig: IconMap) => {
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreview(stateConfig.icon, fill);
    });
    this.stateIconComponents.find(function(comp) {
      return comp.id === stateConfig.state;
    }).refillSVG(fill);
  }

  private setCaseTypeFill = (fill, stateConfig: IconMap) => {
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreviewCaseType(stateConfig.icon, fill);
    });
    this.stateIconComponents.find(function(comp) {
      return (comp.id === stateConfig.state && stateConfig.isCaseType);
    }).refillSVG(fill);
  }

  private selectState = (state: CaseTypeState) => {
    this.selectedStateConfig = this.getConfigForState(state);
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreview(this.selectedStateConfig.icon, this.selectedStateConfig.fill);
    });
  }

  private saveConfig = () => {
    this.liveapps.updateAppConfig(this.sandboxId, this.appId, this.uiAppId, this.appStateConfig, this.appStateConfig.id)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map( val => {
            // trigger cache flush
            this.liveapps.getAppConfig(this.appId, this.uiAppId, true, true)
              .subscribe(appconfig => this.configChanged.emit(this.appStateConfig));
          })
      ).subscribe(null, error => { console.log('Unable to retrieve icon: ' + error.errorMsg); }
    );
  }

  private openDialog(state: CaseTypeState, isCaseType: boolean): void {
    if (!isCaseType) {
      this.selectState(state);
    } else {
      state = new CaseTypeState().deserialize({ value: this.appTypeLabel });
    }
    const dialogRef = this.dialog.open(LiveAppsStateIconUploadDialogComponent, {
      width: '500px',
      data: { state: state, isCaseType: isCaseType }
    });

    dialogRef.componentInstance.fileevent.subscribe(($e) => {
      this.uploadFile($e.file, $e.state, $e.isCaseType);
    })

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private setNewStateIcon = (url) => {
    this.selectedStateConfig.icon = url;
    this.stateIconComponents.find((comp: LiveAppsStateIconComponent) => {
      return (comp.id === this.selectedStateConfig.state);
    }).refresh(this.selectedStateConfig.icon, this.selectedStateConfig.fill);
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreview(this.selectedStateConfig.icon, this.selectedStateConfig.fill);
    });
    this.updateIconMap(this.selectedStateConfig);
  }

  private setNewCaseTypeIcon = (url) => {
    this.caseTypeIcon = url;
    this.stateIconComponents.find((comp: LiveAppsStateIconComponent) => {
      return (comp.id === this.appTypeLabel);
    }).refresh(this.caseTypeIcon, this.caseTypeColor);
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreviewCaseType(this.caseTypeIcon, this.caseTypeColor);
    });
    this.updateIconMap(new IconMap(true, this.appTypeLabel, this.caseTypeColor, this.caseTypeIcon));
  }

  private uploadFile(file: File, state: CaseTypeState, isStateIcon: boolean) {
    if (file) {
      const url = 'webresource/orgFolders/' + this.folderId + '/' + file.name;
      this.liveapps.clearFromIconSVGTextCache(url);
      this.liveapps.uploadDocument('orgFolders', this.folderId, this.sandboxId,
        file, file.name, '')
        .pipe(
          map(val => {
            if (!isStateIcon) {
              this.setNewStateIcon(url);
            } else {
              this.setNewCaseTypeIcon(url);
            }
          })
        )
        .subscribe(
          result => null,
          error => { console.log('error'); this.errorMessage = 'Error uploading state icon: ' + error.errorMsg; });
    }
  }

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private liveapps: LiveAppsService, public dialog: MatDialog) { }

  ngOnInit() {
    // get states for application
    this.liveapps.getCaseTypeStates(this.sandboxId, this.appId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(states => this.states = states.states)
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case type states: ' + error.error.errorMsg; });

    this.liveapps.getAppConfig(this.appId, this.uiAppId, true, false)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(config => {
          this.appStateConfig = config;
          if (this.appStateConfig && this.appStateConfig.stateMap.length > 0) {
            this.appStateConfig.stateMap.forEach((stateMap) => {
              if (stateMap.isCaseType) {
                this.caseTypeIcon = stateMap.icon;
                this.caseTypeColor = stateMap.fill;
              } else {
                if (!this.selectedStateConfig) {
                  this.selectedStateConfig = stateMap;
                }
              }
            });
          }
            // defaults
          if (!this.caseTypeIcon) {
            this.caseTypeIcon = this.DEFAULT_CASE_TYPE_ICON;
          }
          if (!this.caseTypeColor) {
            this.caseTypeColor = this.DEFAULT_CASE_TYPE_COLOR;
          }
          return config;
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving application config: ' + error.error.errorMsg; });
  }

  ngOnDestroy() {
    this._destroyed$.next();
  }

}

@Component({
  selector: 'app-live-apps-state-icon-upload-dialog',
  templateUrl: 'upload-file-dialog/app-live-apps-state-icon-upload-dialog.html',
  styleUrls: [ 'upload-file-dialog/app-live-apps-state-icon-upload-dialog.css']
})
export class LiveAppsStateIconUploadDialogComponent {
  @Output() fileevent = new EventEmitter<any>();
  private fileToUpload: File = undefined;
  private description: string = undefined;
  private fileText: string;

  constructor(
    public dialogRef: MatDialogRef<LiveAppsStateIconUploadDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  private uploadFile = () => {
    if (this.fileToUpload) {
      this.fileevent.emit({ file: this.fileToUpload, state: this.data.state, isCaseType: this.data.isCaseType } );
      this.dialogRef.close();
    }
  }

  setFileDescription(description: string) {
    this.description = description;
  }

  attachFile(files: FileList) {
    this.fileToUpload = files.item(0);
    /*const myReader: FileReader = new FileReader();
    myReader.readAsText(this.fileToUpload);
    this.fileText = myReader.result.toString();*/
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

