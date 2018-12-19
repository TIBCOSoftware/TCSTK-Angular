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
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() folderId: string;
  @Output() configChanged = new EventEmitter();

  private states: CaseTypeState[];
  private errorMessage: string;
  private appStateConfig: AppConfig;
  private selectedStateConfig: IconMap;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  private getConfigForState = (state: CaseTypeState): IconMap => {
    let reqIconMap: IconMap;
    this.appStateConfig.stateMap.forEach((stateMap) => {
      if (stateMap.state === state.value) {
        reqIconMap = stateMap;
      }
    });
    return reqIconMap ? reqIconMap : new IconMap(state.value, '#8197c0', 'assets/icons/ic-generic-state.svg');
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
            this.configChanged.emit(this.appStateConfig);
          })
      ).subscribe(null, error => { console.log('Unable to retrieve icon: ' + error.errorMsg); }
    );
  }

  private openDialog(state: CaseTypeState): void {
    this.selectState(state);
    const dialogRef = this.dialog.open(LiveAppsStateIconUploadDialogComponent, {
      width: '500px',
      data: { state: state }
    });

    dialogRef.componentInstance.fileevent.subscribe(($e) => {
      this.uploadFile($e.file, $e.state);
    })

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private setNewIcon = (url) => {
    this.selectedStateConfig.icon = url;
    this.stateIconComponents.find((comp: LiveAppsStateIconComponent) => {
      return comp.id === this.selectedStateConfig.state;
    }).refresh(this.selectedStateConfig.icon, this.selectedStateConfig.fill);
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreview(this.selectedStateConfig.icon, this.selectedStateConfig.fill);
    });
    this.updateIconMap(this.selectedStateConfig);
  }

  private uploadFile(file, state) {
    if (file) {
      this.liveapps.uploadDocument('orgFolders', this.folderId, this.sandboxId,
        file, file.name, '')
        .pipe(
          map(val => {
            this.setNewIcon('webresource/orgFolders/' + this.folderId + '/' + file.name);
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

    this.liveapps.getAppConfig(this.appId, this.uiAppId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(config => {
          this.appStateConfig = config;
          if (this.appStateConfig && this.appStateConfig.stateMap.length > 0) {
            this.selectedStateConfig = this.appStateConfig.stateMap[0];
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
      this.fileevent.emit({ file: this.fileToUpload, state: this.data.state } );
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

