import { Component, OnInit } from '@angular/core';
import {LiveAppsCaseDataComponent} from '@tibco-tcstk/tc-liveapps-lib';

@Component({
  selector: 'tccwm-cwm-case-data-for-internal-doc',
  templateUrl: './cwm-case-data-for-internal-doc.component.html',
  styleUrls: ['./cwm-case-data-for-internal-doc.component.css']
})
export class CwmCaseDataForInternalDocComponent extends LiveAppsCaseDataComponent {

openDocs() {
  window.open(this.casedata.Dossier.URLdocumentsCASE, '_blank');
}

}
