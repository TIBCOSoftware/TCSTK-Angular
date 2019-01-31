import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LiveAppsCaseCreatorComponent} from '../../components/live-apps-case-creator/live-apps-case-creator.component';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {CaseType, LaProcessSelection} from 'tc-liveapps-lib';

@Component({
  selector: 'tcla-live-apps-case-action',
  templateUrl: './live-apps-case-action.component.html',
  styleUrls: ['./live-apps-case-action.component.css']
})
export class LiveAppsCaseActionComponent extends LiveAppsCaseCreatorComponent implements OnInit, OnChanges {
  @Input() caseRef: string;

  originalData: any;

  private getCaseTypeNameFromSchema(typeId: string, process: LaProcessSelection): CaseType {
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
            const caseTypeName = this.getCaseTypeNameFromSchema(this.typeId, this.process).applicationInternalName;
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
    super.ngOnChanges(changes);
    // handle input param changes
    if (changes.caseRef.currentValue && (changes.caseRef.currentValue !== changes.caseRef.previousValue)) {
      // get case data
      this.getCaseData(changes.caseRef.currentValue);
    }
  }

}
