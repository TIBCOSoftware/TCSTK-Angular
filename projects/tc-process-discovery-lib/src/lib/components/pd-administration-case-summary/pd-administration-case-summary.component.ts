import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LiveAppsCaseSummaryComponent } from 'tc-liveapps-lib';
import { ProcessDiscoveryCaseRoute } from '../../models/pd-liveappsdata';

@Component({
  selector: 'tcpd-pd-administration-case-summary',
  templateUrl: './pd-administration-case-summary.component.html',
  styleUrls: ['./pd-administration-case-summary.component.css']
})
export class PdAdministrationCaseSummaryComponent extends LiveAppsCaseSummaryComponent {
    @Output() clickCaseWithOption: EventEmitter<ProcessDiscoveryCaseRoute> = new EventEmitter<ProcessDiscoveryCaseRoute>();

    public clickCaseActionWithOption = (option: string) => {
        const caseRoute = new ProcessDiscoveryCaseRoute().deserialize({ caseRef: this.caseReference, appId: this.appId, typeId: this.typeId, option: option});
        this.clickCaseWithOption.emit(caseRoute);
      }
    


}
