import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CaseType, JsonSchema, Process} from '../../models/liveappsdata';
import {TcCaseProcessesService} from '../../services/tc-case-processes.service';
import {MatExpansionPanel} from '@angular/material';
import {FormConfig, ProcessFormConfig} from '../../models/tc-liveapps-config';

@Component({
  selector: 'tcla-live-apps-form-preview',
  templateUrl: './live-apps-form-preview.component.html',
  styleUrls: ['./live-apps-form-preview.component.css']
})
export class LiveAppsFormPreviewComponent implements OnChanges {

  @Input() schema: any = {};
  @Input() options: any[];
  @Input() appIds: string[];
  @Input() sandbox: string;
  @Input() formConfig: FormConfig;
  @Input() formsFramework: string = this.formsFramework ? this.formsFramework : 'material-design';

  /**
   * ~event saveFormConfiguration : save form config
   * ~payload any : forms config object
   */
  @Output() formConfigUpdate: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dataPanel', {static: false}) dataPanel: MatExpansionPanel;

  formSchemaJSON: string;
  formDataJSON: string;
  autoLayoutJSON: string;
  formLayoutJSON: string;
  layout: any;
  data: any;
  aceEditorOptions: any = {
    maxLines: 1000,
    printMargin: false,
    showGutter: true,
    autoScrollEditorIntoView: true
  };

  selectedApp: CaseType;
  selectedProcess: Process;

  constructor(private processService: TcCaseProcessesService) { }

  getProcessFormConfig = (formTag: string): ProcessFormConfig => {
    let pfc;
    if (this.formConfig && this.formConfig.processFormConfigs) {
      pfc = this.formConfig.processFormConfigs.filter(fc => {
        return fc.formTag === formTag;
      });
    }
    return (pfc && pfc.length > 0) ? pfc[0] : undefined;
  }

  setProcessFormConfig = (formTag: string, layout?: string, data?: string) => {
    if (!this.formConfig) {
      this.formConfig = new FormConfig();
    }
    if (!this.formConfig.processFormConfigs) {
      this.formConfig.processFormConfigs = [];
    }
      let updatedConfig = false;
      this.formConfig.processFormConfigs.forEach(fc => {
        if (fc.formTag === formTag) {
          if (layout === 'RESET') {
            fc.layout = undefined;
          } else if (layout) {
            fc.layout = layout;
          }
          if (data === 'RESET') {
            fc.data = undefined;
          } else if (data) {
            fc.data = data;
          }
          updatedConfig = true;
        }
      });
      if (!updatedConfig) {
        const newConfig = new ProcessFormConfig().deserialize(
          {
            formTag,
            processId: this.selectedProcess.id,
            processType: this.selectedProcess.processType,
            layout: (layout === 'RESET' ? undefined : layout),
            data
          }
        );
        this.formConfig.processFormConfigs.push(newConfig);
      }
  }

  updateLayoutJSON = (newLayoutJSON) => {
      this.layout = JSON.parse(newLayoutJSON);
      this.setProcessFormConfig(this.selectedProcess.formTag, newLayoutJSON);
  }

  updateDataJSON = (newDataJSON) => {
    this.data = JSON.parse(newDataJSON);
    this.setProcessFormConfig(this.selectedProcess.formTag, undefined, newDataJSON);
  }

  handleAppSelection = (app: CaseType) => {
    this.selectedProcess = undefined;
    this.selectedApp = app;
    this.layout = undefined;
    this.formLayoutJSON = undefined;
    this.data = undefined;
    this.formDataJSON = undefined;
    this.schema = undefined;
  }

  handleProcessSelection = (process: Process) => {
    this.selectedProcess = undefined;
    this.layout = undefined;
    this.formLayoutJSON = undefined;
    this.data = undefined;
    this.formDataJSON = undefined;
    this.schema = undefined;
    const processFormConfig = this.getProcessFormConfig(process.formTag);
    if (processFormConfig && processFormConfig.layout) {
      this.layout = JSON.parse(processFormConfig.layout);
    } else {
      this.layout = undefined;
    }
    this.formLayoutJSON = JSON.stringify(this.layout, null, 2);
    if (processFormConfig && processFormConfig.data) {
      this.data = JSON.parse(processFormConfig.data);
    } else {
      this.data = undefined;
    }
    this.formDataJSON = JSON.stringify(this.data, null, 2);
    const tmpSchema = process.jsonSchema ? process.jsonSchema : this.createDefaultSchema(this.selectedApp);
    if (tmpSchema && tmpSchema.$schema) {
      delete tmpSchema.$schema;
    }
    this.schema = tmpSchema;
    this.formSchemaJSON = JSON.stringify(tmpSchema, null, 2);
    this.selectedProcess = process;
  }

  createDefaultSchema = (app: CaseType): JsonSchema => {
    const newSchema = new JsonSchema().deserialize({ type: 'object', 'properties': [ ] });
    const topLevelType = {};
    topLevelType[app.name] = {};
    newSchema.properties.push(topLevelType);
    return newSchema;
  }

  handleRenderedLayout = (layout: any) => {
    if (!this.autoLayoutJSON) {
      this.autoLayoutJSON = JSON.stringify(layout, null, 2);
    }
  }

  useAutoLayout = () => {
    this.formLayoutJSON = this.autoLayoutJSON;
    this.layout = JSON.parse(this.formLayoutJSON);
    this.setProcessFormConfig(this.selectedProcess.formTag, this.formLayoutJSON);
  }

  useBasicLayout = () => {
    this.formLayoutJSON = JSON.stringify([ { type: 'help',
      helpvalue: '<span>Please fill in this form!</span>' }, '*' ], null, 2);
    this.layout = JSON.parse(this.formLayoutJSON);
    this.setProcessFormConfig(this.selectedProcess.formTag, this.formLayoutJSON);
  }

  useNewLayout = () => {
    this.formLayoutJSON = JSON.stringify([ { type: 'help',
      helpvalue: '<span>Please fill in this form!</span>' } ], null, 2);
    this.layout = JSON.parse(this.formLayoutJSON);
    this.setProcessFormConfig(this.selectedProcess.formTag, this.formLayoutJSON);
  }

  dropLayout = () => {
    this.formLayoutJSON = undefined;
    this.layout = JSON.parse(this.autoLayoutJSON);
    this.setProcessFormConfig(this.selectedProcess.formTag, 'RESET');
  }

  dropData = () => {
    this.formDataJSON = undefined;
    this.data = undefined;
    this.setProcessFormConfig(this.selectedProcess.formTag, undefined, 'RESET');
  }

  saveSampleData = (sampleData: any) => {
    if (sampleData !== undefined && JSON.stringify(sampleData) !== '{}') {
      this.formDataJSON = JSON.stringify(sampleData, null, 2);
      this.data = sampleData;
      this.dataPanel.open();
      this.setProcessFormConfig(this.selectedProcess.formTag, undefined, this.formDataJSON);
    }
  }

  handleSaveFormConfig = () => {
    this.formConfigUpdate.emit();
  }

  openLayoutDocsTab = () => {
    window.open('https://github.com/json-schema-form/angular-schema-form/blob/master/docs/index.md#form-definitions');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.schema) {
      this.formSchemaJSON = JSON.stringify(this.schema, null, 2);
    }
    if (this.layout) {
      this.formLayoutJSON = JSON.stringify(this.layout, null, 2);
    }
    if (this.data) {
      this.formDataJSON = JSON.stringify(this.data, null, 2);
    }
  }

}
