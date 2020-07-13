import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {CaseType, JsonSchema, Process} from '../../models/liveappsdata';
import {TcCaseProcessesService} from '../../services/tc-case-processes.service';
import {MatExpansionPanel} from '@angular/material/expansion';
import {FormConfig, ProcessFormConfig} from '../../models/tc-liveapps-config';
import {TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';
import {RenderedFormComponent} from '@tibco-tcstk/tc-forms-lib';
import {TcFormConfigService} from '../../services/tc-form-config.service';
import {parse} from 'ts-node';

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
  public formsFramework = 'material-design';
  @Input('formsFramework') set FormsFramework(formsFramework) {
    if (formsFramework){
      this.formsFramework = formsFramework;
    }
  }

  /**
   * ~event saveFormConfiguration : save form config
   * ~payload any : forms config object
   */
  @Output() formConfigUpdate: EventEmitter<FormConfig> = new EventEmitter<FormConfig>();

  @ViewChild('dataPanel', {static: false}) dataPanel: MatExpansionPanel;
  @ViewChild(RenderedFormComponent, {static: false}) renderedFormComponent: RenderedFormComponent;

  layout: any[];
  formSchemaJSON: string;
  formDataJSON: string;
  autoLayout: any[];
  initialLayout: any[];
  layoutString: string;
  layoutChangeString: string;
  data: any;
  aceEditorOptions: any = {
    maxLines: 1000,
    printMargin: false,
    showGutter: true,
    autoScrollEditorIntoView: true
  };
  selectedProcessFormConfig: ProcessFormConfig;
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

  setProcessFormConfig = (formTag: string, layout?: any, data?: string) => {
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
          if (!fc.data && !fc.layout) {
            // no point keeping the config if there is no value
            this.formConfig.processFormConfigs = this.formConfig.processFormConfigs.filter(fck => fck.formTag !== fc.formTag);
          }
          updatedConfig = true;
        }
      });
      if (!updatedConfig) {
        if (data || layout) {
          const newConfig = new ProcessFormConfig().deserialize(
            {
              formTag,
              processId: this.selectedProcess.id,
              processType: this.selectedProcess.processType,
              layout: (layout === 'RESET' ? undefined : layout),
              data: (data === 'RESET' ? undefined : data),
            }
          );
          this.formConfig.processFormConfigs.push(newConfig);
        }
      }
  }

  parseLayoutString = (layoutString: string): any => {
    let newFormObject: any = null;
    // tslint:disable-next-line:no-eval
    eval('newFormObject = ' + layoutString);
    return newFormObject;
  }

  updateLayout = (newLayout: string) => {
    // if (this.layout !== newLayout) {
      this.layout = this.parseLayoutString(newLayout);
      this.layoutChangeString = newLayout;
      this.renderedFormComponent.updateLayout(newLayout);
      this.setProcessFormConfig(this.selectedProcess.formTag, this.layoutChangeString);
    // }
  }

  updateDataJSON = (newDataJSON) => {
    this.data = JSON.parse(newDataJSON);
    this.setProcessFormConfig(this.selectedProcess.formTag, undefined, newDataJSON);
  }

  handleAppSelection = (app: CaseType) => {
    this.selectedProcess = undefined;
    this.selectedApp = app;
    this.layout = undefined;
    this.data = undefined;
    this.formDataJSON = undefined;
    this.schema = undefined;
  }

  handleProcessSelection = (process: Process) => {
    this.selectedProcessFormConfig = undefined;
    this.selectedProcess = undefined;
    this.layout = undefined;
    this.layoutString = undefined;
    this.data = undefined;
    this.formDataJSON = undefined;
    this.schema = undefined;
    const processFormConfig = this.getProcessFormConfig(process.formTag);
    this.selectedProcessFormConfig = processFormConfig;
    if (processFormConfig && processFormConfig.layout) {

      this.layout = this.parseLayoutString(processFormConfig.layout);
      this.layoutChangeString = processFormConfig.layout;
      this.layoutString = processFormConfig.layout;
      // this.renderedFormComponent.updateLayout(processFormConfig.layout);
      this.initialLayout = this.layout;
    } else {
      this.layout = undefined;
    }
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
    if (this.layoutString && this.renderedFormComponent) {
      this.renderedFormComponent.updateLayout(this.layoutString);
    }
  }

  createDefaultSchema = (app: CaseType): JsonSchema => {
    const newSchema = new JsonSchema().deserialize({ type: 'object', 'properties': [ ] });
    const topLevelType = {};
    topLevelType[app.name] = {};
    newSchema.properties.push(topLevelType);
    return newSchema;
  }

  handleRenderedLayout = (layout: any) => {
    if (!this.autoLayout) {
      this.autoLayout = layout;
    }
  }

  useAutoLayout = () => {
    this.layout = this.autoLayout;
    this.layoutString = TcCoreCommonFunctions.formLayoutToJson(this.autoLayout);
    this.updateLayout(this.layoutString);
  }

  useBasicLayout = () => {
    this.layout = [ { type: 'help',
      helpvalue: '<span>Please fill in this form!</span>' }, '*' ];
    this.layoutString = TcCoreCommonFunctions.formLayoutToJson(this.layout);
    this.updateLayout(this.layoutString);
  }

  useNewLayout = () => {
    this.layout = [ { type: 'help',
      helpvalue: '<span>Please fill in this form!</span>' } ];
    this.layoutString = TcCoreCommonFunctions.formLayoutToJson(this.layout);
    this.updateLayout(this.layoutString);
  }

  useExampleLayout = () => {
    this.layout = JSON.parse('[\n' +
      '  {\n' +
      '    "type": "help",\n' +
      '    "helpvalue": "<span>Please fill in this form!</span>"\n' +
      '  },\n' +
      '  {\n' +
      '    "key": "Expenses.ClaimantName",\n' +
      '    "type": "select",\n' +
      '    "titleMap": [\n' +
      '      { "value": "John Smith", "name": "John Smith" },\n' +
      '      { "value": "Justine Rogers", "name": "Justin Rogers" },\n' +
      '      { "value": "James West", "name": "James West"}\n' +
      '    ]\n' +
      '  },\n' +
      '  {\n' +
      '      "type": "conditional",\n' +
      '      "condition": "model.Expenses.ClaimantName",\n' +
      '      "items": [\n' +
      '          {\n' +
      '              "key": "Expenses.DepartmentCode",\n' +
      '                "type": "text"\n' +
      '          }\n' +
      '        ]\n' +
      '  }\n' +
      ']');
    this.layoutString = TcCoreCommonFunctions.formLayoutToJson(this.layout);
    this.updateLayout(this.layoutString);
  }

  dropLayout = () => {
    this.layout = undefined;
    this.layoutString = undefined;
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
    this.formConfigUpdate.emit(this.formConfig);
  }

  openLayoutDocsTab = () => {
    window.open('https://github.com/json-schema-form/angular-schema-form/blob/master/docs/index.md#form-definitions');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.formsFramework) {
      this.formsFramework = 'material-design';
    }
    if (this.schema) {
      this.formSchemaJSON = JSON.stringify(this.schema, null, 2);
    }
  }
}
