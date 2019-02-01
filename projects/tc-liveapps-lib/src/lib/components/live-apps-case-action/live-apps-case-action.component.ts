import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {LiveAppsCaseCreatorComponent} from '../../components/live-apps-case-creator/live-apps-case-creator.component';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {CaseType, LaProcessSelection, ProcessId} from '../../models/liveappsdata';

@Component({
  selector: 'tcla-live-apps-case-action',
  templateUrl: './live-apps-case-action.component.html',
  styleUrls: ['./live-apps-case-action.component.css']
})
export class LiveAppsCaseActionComponent extends LiveAppsCaseCreatorComponent implements OnInit, OnChanges {
  @Input() caseRef: string;

  originalData: any;

  private getMainCaseTypeFromSchema(typeId: string, process: LaProcessSelection): CaseType {
    let requestedType: CaseType;
    process.appSchema.casetypes.forEach((cType) => {
      if (cType.id === typeId) {
        requestedType = cType;
      }
    });
    return requestedType;
  }

  private getCaseData = (caseRef) => {
    // retrieve the case data for this case reference
    this.liveapps.getCase(this.caseRef, this.sandboxId, this.applicationId, this.typeId )
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          if (result.metadata.applicationId === this.applicationId.toString()) {
            const casedata = result.untaggedCasedataObj;
            this.originalData = {
              [this.process.process.name]: casedata
            };
            const caseTypeName = this.getMainCaseTypeFromSchema(this.typeId, this.process).applicationInternalName;
            this.data = {
              [caseTypeName]: casedata
            };
          } else {
            console.error('The selected case is not the right case type for this action');
          }
        })
    )
      .subscribe(success => success, error => {
        // Emit any error retrieving case data to the parent
        console.error('Unable to retrieve case data');
        console.error(error);
      });
  }

  constructor(private lasvc: LiveAppsService) {
    super(lasvc);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // the extended class will detect change in the process and layout passed
    super.ngOnChanges(changes);
    // handle input param changes
    if ((changes.caseRef && changes.caseRef.currentValue && (changes.caseRef.currentValue !== changes.caseRef.previousValue))
      || (changes.process && changes.process.currentValue && (changes.process.currentValue !== changes.process.previousValue))) {
      // get case data if anything changes
      this.getCaseData(this.caseRef);
    }
  }

}
