import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {LiveAppsFormConfig} from '../../models/tc-liveapps-form';
import {CaseType} from '../../models/liveappsdata';
import {TcAppDefinitionService} from '../../services/tc-app-definition.service';
import {FormConfig, FormRef, ProcessFormConfig} from '../../models/tc-liveapps-config';
import {TcFormConfigService} from '../../services/tc-form-config.service';

@Component({
  selector: 'tcla-live-apps-workitem',
  templateUrl: './live-apps-workitem.component.html',
  styleUrls: ['./live-apps-workitem.component.css']
})
export class LiveAppsWorkitemComponent implements OnChanges {

  /**
   * The workitem id to display
   */
  @Input() workitemId: number;

  /**
   * The workitem task name
   */
  @Input() workitemName: string;

  /**
   * The applicationId
   */
  @Input() appId: string;

  /**
   * The sandboxId
   */
  @Input() sandboxId: string;

  /**
   * Custom Form Layout Configuration
   */
  @Input() formConfig: FormConfig = this.formConfig ? this.formConfig : new FormConfig();

  /**
   * ~event workitemResult : id of completed workitem
   * ~payload string : workitemId
   */
  @Output() workitemComplete: EventEmitter<number> = new EventEmitter<number>();

  wcFormConfig: LiveAppsFormConfig;
  caseType: CaseType;
  processFormConfig: ProcessFormConfig;
  formRef: FormRef;

  constructor(protected appDefinitionService: TcAppDefinitionService) {
  }

  handleWorkitemComplete = (event) => {
    this.workitemComplete.emit(this.workitemId);
  }

  handleWorkitemCancelled = (event) => {
    this.workitemComplete.emit(this.workitemId);
  }

  handleWorkitemClosed = (event) => {
    this.workitemComplete.emit(this.workitemId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.appId && this.formConfig && this.workitemId && this.sandboxId && this.workitemName) {
      this.caseType = this.appDefinitionService.getCaseTypeByAppId(this.appId);
      this.formRef = TcFormConfigService.buildFormTag(this.caseType.applicationName, this.caseType.applicationInternalName, 'workitem', this.workitemName);
      this.processFormConfig = TcFormConfigService.getProcessFormConfig(TcFormConfigService.parseFormTag(this.formRef), this.formConfig);
      this.wcFormConfig = new LiveAppsFormConfig().deserialize({
        type: 'workitem',
        id: this.workitemId,
        sandbox: this.sandboxId.toString(),
        formDivId: 'wiDialogDiv',
        useCustomForm: this.processFormConfig ? this.processFormConfig.externalForm.toString() : 'false',
        formRef: TcFormConfigService.parseFormTag(this.formRef)
      });
    }
  }

}
