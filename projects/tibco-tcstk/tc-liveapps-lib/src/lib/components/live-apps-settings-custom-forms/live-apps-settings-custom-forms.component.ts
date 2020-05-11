import {Component, OnInit} from '@angular/core';
import {FormConfig, LiveAppsConfig} from '../../models/tc-liveapps-config';
import {ActivatedRoute} from '@angular/router';
import {GeneralConfig, Claim, Sandbox} from '@tibco-tcstk/tc-core-lib';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import { MatSnackBar } from '@angular/material';
import {TcFormConfigService} from '../../services/tc-form-config.service';

/**
 * Configuration of forms
 *
 * ![alt-text](../live-apps-settings-forms.png "")
 *
 *@example <tcla-live-apps-settings-forms></tcla-live-apps-settings-forms>
 */
@Component({
  selector: 'tcla-live-apps-settings-forms',
  templateUrl: './live-apps-settings-custom-forms.component.html',
  styleUrls: ['./live-apps-settings-custom-forms.component.css']
})
export class LiveAppsSettingsCustomFormsComponent extends LiveAppsComponent implements OnInit {

  public sandboxId: number;
  public liveAppsConfig: LiveAppsConfig;
  public generalConfig: GeneralConfig;
  public formConfig: FormConfig;
  public claims: Claim;
  public formTags: string[];

  constructor(protected route: ActivatedRoute, protected formConfigService: TcFormConfigService, protected snackBar: MatSnackBar) {
    super();
  }

  public formConfigChange(formConfig: FormConfig) {
    this.formConfig = formConfig;
    this.runSaveFunction();
  }

  public ngOnInit() {
    this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
    this.formConfig = this.route.snapshot.data.formConfig;
    this.formTags = TcFormConfigService.getCustomFormTags(this.formConfig);
    this.claims = this.route.snapshot.data.claims;
    this.sandboxId = Number(this.claims.primaryProductionSandbox.id).valueOf();
  }

  public runSaveFunction = (): void => {
    this.formConfigService.updateFormConfig(this.sandboxId, this.generalConfig.uiAppId, this.formConfig, this.formConfig.id).subscribe(
      result => {
        this.snackBar.open('Live Apps form layout configuration settings saved', 'OK', {
          duration: 3000
        });
      },
      error => {
        this.snackBar.open('Error saving form layout configuration', 'OK', {
          duration: 3000
        });
      }
    );
  }
}
