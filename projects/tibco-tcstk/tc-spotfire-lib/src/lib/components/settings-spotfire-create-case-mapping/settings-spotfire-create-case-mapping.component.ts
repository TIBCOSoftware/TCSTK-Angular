import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SpotfireMarkingCreateCaseConfig} from '../../models/tc-spotfire-config';
import {TcSpotfireMarkingLiveappsConfigService} from '../../services/tc-spotfire-marking-liveapps-config.service';

@Component({
  selector: 'tcsf-settings-spotfire-create-case-mapping',
  templateUrl: './settings-spotfire-create-case-mapping.component.html',
  styleUrls: ['./settings-spotfire-create-case-mapping.component.css']
})

export class SettingsSpotfireCreateCaseMappingComponent implements OnInit {

  constructor(
    protected route: ActivatedRoute,
    protected spotfireMLConfigService: TcSpotfireMarkingLiveappsConfigService,
    protected snackBar: MatSnackBar
  ) {
  }

  private id: string;
  private uiAppId: string;
  private sandboxId: number;

  // Configuration object
  public SMCCConfig: SpotfireMarkingCreateCaseConfig = new SpotfireMarkingCreateCaseConfig();

  aceEditorOptions: any = {
    maxLines: 1000,
    printMargin: false,
    showGutter: true,
    autoScrollEditorIntoView: true
  };

  // Config String for ACE Editor
  configJSON = '';

  private doChange = true;

  ngOnInit() {
    this.refresh();
  }

  // Process updates from the souce pane
  updateConfigJSON(newJson) {
    // console.log('Update JSON ', newJson);
    const correctJson = newJson.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
    // console.log('Correct JSON: ' , correctJson);
    if (this.doChange) {
      this.SMCCConfig = JSON.parse(correctJson);
      this.SMCCConfig.uiAppId = this.uiAppId;
      this.SMCCConfig.id = this.id;
    }
  }

  // Update to te source pane
  updatePane() {
    // this.configJSON = JSON.stringify(this.SMCCConfig , null, 1)
    this.doChange = false;
    const valueForPane = this.SMCCConfig;
    delete valueForPane.id;
    delete valueForPane.uiAppId;
    this.configJSON = JSON.stringify(valueForPane , null, '\t');
    setTimeout(() => { this.doChange = true; }, 500);
  }

  // Initial loading of data
  private refresh = (): void => {
    // Get initial data from route
    this.SMCCConfig = this.route.snapshot.data.spotfireMappingConfigHolder;
    // console.log('GOT CONFIG: ' , this.SMCCConfig);
    this.sandboxId = this.route.snapshot.data.claimsHolder.primaryProductionSandbox.id;
    this.id = this.SMCCConfig.id;
    this.uiAppId = this.SMCCConfig.uiAppId;
    this.updatePane();
  }

  // Store data to shared state
  public runSaveFunction = (): void => {
    const configToSave = this.SMCCConfig;
    configToSave.id = this.id;
    configToSave.uiAppId = this.uiAppId;
    this.spotfireMLConfigService.updateSpotfireConfig(this.sandboxId,
      this.uiAppId, configToSave, this.id).subscribe(
      result => {
        this.snackBar.open('Spotfire settings saved', 'OK', {
          duration: 3000
        });
      },
      error => {
        this.snackBar.open('Error saving Spotfire settings...', 'OH SHIT', {
          duration: 3000
        });
      }
    );
  }

  // Use sample value
  useExampleLayout = () => {
    this.doChange = false;
    this.configJSON = '{\n' +
      '  markingName: "Case Marking",\n' +
      '  tableName: "newtransactionsscoredwstate",\n' +
      '  objectPath: "RiskInvestigation201.Records_v1",\n' +
      '  attributes: [\n' +
      '  {\n' +
      '    sourceAttr: "oddity",\n' +
      '    targetAttr: "Oddity_v1"\n' +
      '  },\n' +
      '  {\n' +
      '    sourceAttr: "fraud_probability",\n' +
      '    targetAttr: "TargetProbability_v1"\n' +
      '  },\n' +
      '  {\n' +
      '    sourceAttr: "id",\n' +
      '    targetAttr: "id_v1"\n' +
      '  }\n' +
      '  ],\n' +
      '  initialValue: {\n' +
      '    RiskInvestigation201: {\n' +
      '      Channel_v1: "Spotfire",\n' +
      '        Comment_v1: "",\n' +
      '        Decision_v1: "undetermined",\n' +
      '        Followup_v1: "None"\n' +
      '    }\n' +
      '  }\n' +
      '}\n';
    const correctJson = this.configJSON.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
    // console.log('Correct JSON: ' , correctJson);
    this.SMCCConfig = JSON.parse(correctJson);
    setTimeout(() => { this.doChange = true; }, 500);
  }

}
