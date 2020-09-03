import { Component, OnInit } from '@angular/core';
import { SpotfireConfig, TcSpotfireConfigService } from '@tibco-tcstk/tc-spotfire-lib';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './settings-spotfire.component.html',
  styleUrls: ['./settings-spotfire.component.css']
})
export class SettingsSpotfireComponent implements OnInit {

  public spotfireConfig: SpotfireConfig;
  public sandboxId: number;

  constructor(protected route: ActivatedRoute, protected spotfireConfigService: TcSpotfireConfigService, protected snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.spotfireConfig = this.route.snapshot.data.spotfireConfigHolder;
    this.sandboxId = 3100; // this.route.snapshot.data.claimsHolder.primaryProductionSandbox.id;
  }


  public handleSave = (): void => {
    //     allowedPages: this.allowedPages.split(','),
    //     columnNames: this.columnNames.split(',')

    this.spotfireConfigService.updateSpotfireConfig(this.sandboxId, this.spotfireConfig.uiAppId, this.spotfireConfig, this.spotfireConfig.id).subscribe(
        result => {
            this.snackBar.open('Spotfire settings saved', 'OK', {
                duration: 3000
            });
        },
        error => {
            this.snackBar.open('Error saving Spotfire settings saved', 'OK', {
                duration: 3000
            });
        }
    );
}

}
