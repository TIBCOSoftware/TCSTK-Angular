import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SpotfireConfig } from '../../models/tc-spotfire-config';

@Component({
  selector: 'tcsf-settings-spotfire',
  templateUrl: './settings-spotfire.component.html',
  styleUrls: ['./settings-spotfire.component.css']
})
export class SettingsSpotfireComponent implements OnInit {

    @Input() spotfireConfig: SpotfireConfig;

    @Output() handleSave: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    /**
     * Save Button
     */
    runSave(){
        this.handleSave.emit();
    }

    public handleEditLiveAppClick = (): void => {
        window.open(this.spotfireConfig.spotfireServer + '/spotfire/wp/analysis?file=' + this.spotfireConfig.analysisPath);
    }

}
