import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {AppConfig, CaseTypeState, IconMap} from '../../models/liveappsdata';
import {map, take, takeUntil} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {LiveAppsCaseDataComponent} from '../live-apps-case-data/live-apps-case-data.component';
import {LiveAppsStateIconComponent} from '../live-apps-state-icon/live-apps-state-icon.component';
import {LiveAppsCaseSummaryComponent} from '../live-apps-case-summary/live-apps-case-summary.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LiveAppsDocumentUploadDialogComponent} from '../live-apps-documents/live-apps-documents.component';
import { Location } from '@angular/common';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';

@Component({
  selector: 'tcla-live-apps-application-configuration',
  templateUrl: './live-apps-application-configuration.component.html',
  styleUrls: ['./live-apps-application-configuration.component.css']
})
export class LiveAppsApplicationConfigurationComponent extends LiveAppsComponent implements OnInit {
  // The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChildren('iconcomp') stateIconComponents: QueryList<LiveAppsStateIconComponent>;
  @ViewChildren(LiveAppsCaseSummaryComponent) caseSummaryComponent: QueryList<LiveAppsCaseSummaryComponent>;

  @Input() appId: string;
  @Input() appTypeLabel: string;
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() folderId: string;
  @Output() configChanged = new EventEmitter();

  public states: CaseTypeState[];
  public errorMessage: string;
  public appStateConfig: AppConfig;
  public selectedStateConfig: IconMap;
  public caseTypeIcon: string;
  public caseTypeColor: string;

  // prepareExternalUrl will add the base href
  public DEFAULT_CASE_TYPE_ICON = this.location.prepareExternalUrl('/assets/icons/ic-generic-casetype.svg');
  public DEFAULT_CASE_TYPE_COLOR = '#8197c0';
  public DEFAULT_CASE_STATE_ICON = this.location.prepareExternalUrl('/assets/icons/ic-generic-state.svg');
  public DEFAULT_CASE_STATE_COLOR = '#8197c0';
  public DEFAULT_COLOR_PALETTE = [
    '#3E94C0', '#49B3D3', '#76C6CF', '#A9DACD', '#DCECC9',
    '#FFAB40', '#FFD180', '#FFE0B2', '#FFF3E0', '#81D4FA',
    '#B3E5FC', '#8AF2F2', '#91A3AE', '#CED8DD', '#EBEFF1',
    '#6A1B9A', '#AD1457', '#EC407A', '#C4469E', '#BA68C8',
    '#8C9EFF', '#FF8A80', '#546F7A', '#263237'
  ];

  public getConfigForState = (state: CaseTypeState): IconMap => {
    let reqIconMap: IconMap;
    if (this.appStateConfig && this.appStateConfig.stateMap) {
      this.appStateConfig.stateMap.forEach((stateMap) => {
        if (stateMap.state === state.value) {
          reqIconMap = stateMap;
        }
      });
    }
    return reqIconMap ? reqIconMap : new IconMap(false, state.value, this.DEFAULT_CASE_STATE_COLOR, this.DEFAULT_CASE_STATE_ICON);
  }

  public getConfigForCaseType = (caseTypeId: string): IconMap => {
    let reqIconMap: IconMap;
    if (this.appStateConfig && this.appStateConfig.stateMap) {
      this.appStateConfig.stateMap.forEach((stateMap) => {
        if (stateMap.state === caseTypeId) {
          reqIconMap = stateMap;
        }
      });
    }
    return reqIconMap ? reqIconMap : new IconMap(true, caseTypeId, this.DEFAULT_CASE_TYPE_COLOR, this.DEFAULT_CASE_TYPE_ICON);
  }

  public updateIconMap = (stateConfig: IconMap) => {
    let foundMap: IconMap;
    let updatedMap: IconMap;
    if (this.appStateConfig && this.appStateConfig.stateMap) {
      this.appStateConfig.stateMap.forEach(function(stateMap) {
        if (stateMap.state === stateConfig.state) {
          foundMap = stateConfig;
          stateMap.state = stateConfig.state;
          stateMap.icon = stateConfig.icon;
          stateMap.fill = stateConfig.fill;
        }
      });
      if (foundMap) {
        foundMap = stateConfig;
      } else {
        this.appStateConfig.stateMap.push(stateConfig);
      }
    } else {
      this.appStateConfig.stateMap = [];
      this.appStateConfig.stateMap.push(stateConfig);
    }
  }

  public setFill = (fill, stateConfig: IconMap) => {
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreview(stateConfig.icon, fill);
    });
    this.stateIconComponents.find(function(comp) {
      return comp.id === stateConfig.state;
    }).refillSVG(fill);
  }

  public setCaseTypeFill = (fill, stateConfig: IconMap) => {
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreviewCaseType(stateConfig.icon, fill);
    });
    this.stateIconComponents.find(function(comp) {
      return (comp.id === stateConfig.state && stateConfig.isCaseType);
    }).refillSVG(fill);
  }

  public selectState = (state: CaseTypeState) => {
    this.selectedStateConfig = this.getConfigForState(state);
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreview(this.selectedStateConfig.icon, this.selectedStateConfig.fill);
    });
  }

  public saveConfig = () => {
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

  public openDialog(state: CaseTypeState, isCaseType: boolean): void {
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

  public setNewStateIcon = (url) => {
    this.selectedStateConfig.icon = url;
    this.stateIconComponents.find((comp: LiveAppsStateIconComponent) => {
      return (comp.id === this.selectedStateConfig.state);
    }).refresh(this.selectedStateConfig.icon, this.selectedStateConfig.fill);
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreview(this.selectedStateConfig.icon, this.selectedStateConfig.fill);
    });
    this.updateIconMap(this.selectedStateConfig);
  }

  public setNewCaseTypeIcon = (url) => {
    this.caseTypeIcon = url;
    this.stateIconComponents.find((comp: LiveAppsStateIconComponent) => {
      return (comp.id === this.appTypeLabel);
    }).refresh(this.caseTypeIcon, this.caseTypeColor);
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreviewCaseType(this.caseTypeIcon, this.caseTypeColor);
    });
    this.updateIconMap(new IconMap(true, this.appTypeLabel, this.caseTypeColor, this.caseTypeIcon));
  }

  public uploadFile(file: File, state: CaseTypeState, isStateIcon: boolean) {
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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,
              private liveapps: LiveAppsService, public dialog: MatDialog, private location: Location) {
    super();
  }

  ngOnInit() {
    // get states for application
    this.liveapps.getCaseTypeStates(this.sandboxId, this.appId, 50)
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
          if (this.appStateConfig && this.appStateConfig.stateMap && this.appStateConfig.stateMap.length > 0) {
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
}

@Component({
  selector: 'tcla-live-apps-state-icon-upload-dialog',
  templateUrl: 'upload-file-dialog/app-live-apps-state-icon-upload-dialog.html',
  styleUrls: [ 'upload-file-dialog/app-live-apps-state-icon-upload-dialog.css']
})
export class LiveAppsStateIconUploadDialogComponent {
  @Output() fileevent = new EventEmitter<any>();
  public fileToUpload: File = undefined;
  public description: string = undefined;
  public fileText: string;

  constructor(
    public dialogRef: MatDialogRef<LiveAppsStateIconUploadDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  public uploadFile = () => {
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

