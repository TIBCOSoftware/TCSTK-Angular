import { Component, Input } from '@angular/core';
import { LiveAppsCreatorSelectorComponent } from '@tibco-tcstk/tc-liveapps-lib';

@Component({
  selector: 'tcpd-pd-creator-selector',
  templateUrl: './pd-creator-selector.component.html',
  styleUrls: ['./pd-creator-selector.component.css']
})
export class PdCreatorSelectorComponent extends LiveAppsCreatorSelectorComponent {

    @Input() selectedCreatorId: string;
    compareObjects = (o1: any, o2: any): boolean => {
        return o1.id === this.selectedCreatorId;
    }

}
