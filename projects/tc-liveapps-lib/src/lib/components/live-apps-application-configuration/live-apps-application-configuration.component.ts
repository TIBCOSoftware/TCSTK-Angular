
/*
*     Case Type icons are stored in an orgFolder specified in liveAppsConfig.json (pushed to shared state)
*     Icon Name will be appId.filename.svg
*     Icon svg should contain <DYNAMICFILL> this will be set according to the color selected in this component
*
*     eg: 1742.ic-created.svg for Partner Portal Live Apps App (appId: 1742) 'Created' state
*
*     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
*        <path fill="<DYNAMICFILL>" class="svg-content" fill-rule="evenodd" d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14zm3.474-6.472a.527.527 0 0 0 0-1.053H7.526V3.527a.525.525 0 1 0-1.052 0v2.948H3.526a.527.527 0 0 0 0 1.053h2.948v2.948a.525.525 0 0 0 .898.373.525.525 0 0 0 .154-.373V7.528h2.948z"/>
*      </svg>
*
*
 */
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList, SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {CardConfig, CaseTypeState, IconMap} from '../../models/liveappsdata';
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
import {CaseCardConfig} from '../../models/tc-case-card-config';
import {TcCaseCardConfigService} from '../../services/tc-case-card-config.service';
import {TcDocumentService} from '../../services/tc-document.service';

@Component({
  selector: 'tcla-live-apps-application-configuration',
  templateUrl: './live-apps-application-configuration.component.html',
  styleUrls: ['./live-apps-application-configuration.component.css']
})
export class LiveAppsApplicationConfigurationComponent extends LiveAppsComponent implements OnChanges {
  // The ViewChild declarations give access to components marked on the template so that I can call public functions like refresh
  @ViewChildren('iconcomp') stateIconComponents: QueryList<LiveAppsStateIconComponent>;
  @ViewChildren(LiveAppsCaseSummaryComponent) caseSummaryComponent: QueryList<LiveAppsCaseSummaryComponent>;

  @Input() appId: string;
  @Input() appTypeLabel: string;
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Input() folderId: string;
  @Output() configChanged: EventEmitter<CaseCardConfig> = new EventEmitter<CaseCardConfig>();

  public errorMessage: string;
  public caseCardConfig: CaseCardConfig;
  public selectedStateConfig: IconMap;
  public selectedCaseTypeConfig: IconMap;
  public caseTypeIcon: string;
  public caseTypeColor: string;

  // prepareExternalUrl will add the base href
  public DEFAULT_CASE_TYPE_ICON = 'assets/icons/ic-generic-casetype.svg';
  public DEFAULT_CASE_TYPE_COLOR = '#8197c0';
  public DEFAULT_CASE_STATE_ICON = 'assets/icons/ic-generic-state.svg';
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
    if (this.caseCardConfig.cardConfig && this.caseCardConfig.cardConfig.stateMap) {
      this.caseCardConfig.cardConfig.stateMap.forEach((stateMap) => {
        if (stateMap.state === state.value) {
          reqIconMap = stateMap;
        }
      });
    }
    return reqIconMap ? reqIconMap : new IconMap(false, state.value, this.DEFAULT_CASE_STATE_COLOR, this.DEFAULT_CASE_STATE_ICON);
  }

  public getConfigForCaseType = (caseTypeId: string): IconMap => {
    let reqIconMap: IconMap;
    if (this.caseCardConfig.cardConfig && this.caseCardConfig.cardConfig.stateMap) {
      this.caseCardConfig.cardConfig.stateMap.forEach((stateMap) => {
        if (stateMap.isCaseType) {
          reqIconMap = stateMap;
        }
      });
    }
    return reqIconMap ? reqIconMap : new IconMap(true, caseTypeId, this.DEFAULT_CASE_TYPE_COLOR, this.DEFAULT_CASE_TYPE_ICON);
  }

  public updateIconMap = (stateConfig: IconMap) => {
    let foundMap: IconMap;
    let updatedMap: IconMap;
    if (this.caseCardConfig.cardConfig && this.caseCardConfig.cardConfig.stateMap) {
      this.caseCardConfig.cardConfig.stateMap.forEach(function(stateMap) {
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
        this.caseCardConfig.cardConfig.stateMap.push(stateConfig);
      }
    } else {
      this.caseCardConfig.cardConfig.stateMap = [];
      this.caseCardConfig.cardConfig.stateMap.push(stateConfig);
    }
    this.configChanged.emit(this.caseCardConfig);
  }

  public handleCaseTypeColorToggleChange = (changes) => {
    this.caseCardConfig.cardConfig.useCaseTypeColor = changes.checked ? changes.checked : false;
    this.configChanged.emit(this.caseCardConfig);
  }

  public setFill = (fill, stateConfig: IconMap) => {
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreview(stateConfig.icon, fill);
    });
    this.stateIconComponents.find(function(comp) {
      return comp.id === stateConfig.state;
    }).refillSVG(fill);
    this.configChanged.emit(this.caseCardConfig);
  }

  public setCaseTypeFill = (fill, stateConfig: IconMap) => {
    this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
      comp.restylePreviewCaseType(stateConfig.icon, fill);
    });
    this.stateIconComponents.find(function(comp) {
      return (comp.id === stateConfig.state && stateConfig.isCaseType);
    }).refillSVG(fill);
    this.configChanged.emit(this.caseCardConfig);
  }

  public selectState = (state: CaseTypeState) => {
    this.selectedStateConfig = this.getConfigForState(state);
    if (!this.caseCardConfig.cardConfig.useCaseTypeColor) {
      this.caseSummaryComponent.forEach((comp: LiveAppsCaseSummaryComponent) => {
        comp.restylePreview(this.selectedStateConfig.icon, this.selectedStateConfig.fill);
      });
    }
  }

  /*public saveConfig = () => {
    this.caseCardConfigService.updateCaseCardConfig(this.sandboxId, this.appId, this.uiAppId, this.caseCardConfig)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(caseCardConfig => {
          this.caseCardConfig = caseCardConfig;
        })
      ).subscribe(null, error => { console.log('Unable to update case card config: ' + error.errorMsg); }
    );
  }*/

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
      const url = 'webresource/v1/orgFolders/' + this.folderId + '/' + this.appId + '.' + file.name;
      const dlUrl = 'webresource/orgFolders/' + this.folderId + '/' + this.appId + '.' + file.name;
      this.liveapps.clearFromIconSVGTextCache(url);
      this.documentsService.uploadDocument('orgFolders', this.folderId, this.sandboxId,
        file, (this.appId + '.' + file.name), '')
        .pipe(
          map(val => {
            if (!isStateIcon) {
              this.setNewStateIcon(dlUrl);
            } else {
              this.setNewCaseTypeIcon(dlUrl);
            }
          })
        )
        .subscribe(
          result => null,
          error => { console.log('error'); this.errorMessage = 'Error uploading state icon: ' + error.errorMsg; });
    }
  }

  public refresh = () => {
    // need states & cardConfig
    this.selectedCaseTypeConfig = null;
    this.caseCardConfigService.getCaseCardConfig(this.sandboxId, this.appId, this.uiAppId, this.appTypeLabel, this.DEFAULT_CASE_TYPE_COLOR, this.DEFAULT_CASE_TYPE_ICON, this.DEFAULT_CASE_STATE_COLOR, this.DEFAULT_CASE_STATE_ICON).pipe(
      take(1),
      takeUntil(this._destroyed$),
      map(caseCardConfig => {
        this.caseCardConfig = caseCardConfig;
        // set default selected to first state for this case type (0 is case type)
        this.selectedStateConfig = this.caseCardConfig.cardConfig.stateMap[1];
        const caseTypeRec = this.caseCardConfig.cardConfig.stateMap.find(function(stateMap) {
          return stateMap.isCaseType;
        });

        this.caseTypeIcon = caseTypeRec.icon;
        this.caseTypeColor = caseTypeRec.fill;
        this.selectedCaseTypeConfig = this.getConfigForCaseType(this.appTypeLabel);
      })
    ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving case card config: ' + error.error.errorMsg; });
  }

  constructor(private http: HttpClient, private sanitizer: DomSanitizer,
              private liveapps: LiveAppsService, public caseCardConfigService: TcCaseCardConfigService, private documentsService: TcDocumentService, public dialog: MatDialog, private location: Location) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appId && (changes.appId.currentValue !== changes.appId.previousValue)) {
      this.refresh();
    }
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

