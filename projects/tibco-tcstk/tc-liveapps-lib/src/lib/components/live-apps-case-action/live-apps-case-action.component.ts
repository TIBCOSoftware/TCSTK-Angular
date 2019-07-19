import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {LiveAppsCaseCreatorComponent} from '../live-apps-case-creator/live-apps-case-creator.component';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {CaseType, ProcessId} from '../../models/liveappsdata';
import {LaProcessSelection} from '../../models/tc-case-processes';


/**
 * Wraps rendering an execution of an action
 *
 *@example <tcla-live-apps-case-action></tcla-live-apps-case-action>
 */

@Component({
  selector: 'tcla-live-apps-case-action',
  templateUrl: './live-apps-case-action.component.html',
  styleUrls: ['./live-apps-case-action.component.css']
})
export class LiveAppsCaseActionComponent extends LiveAppsCaseCreatorComponent implements OnInit, OnChanges {
  /**
   * The case reference
   */
  @Input() caseRef: string;

  /**
   * Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
   */
  @Input() showHeader: boolean;

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
        takeUntil(this._destroyed$)
      )
      .subscribe(result => {
        if (result.metadata.applicationId === this.applicationId.toString()) {
          const casedata = result.untaggedCasedataObj;
          this.originalData = {
            [this.process.process.name]: casedata
          };
          // JS: use name rather than internalObjectName to handle appliction name change
          const caseTypeName = this.getMainCaseTypeFromSchema(this.typeId, this.process).name;
          this.data = {
            [caseTypeName]: casedata
          };
        } else {
          console.error('The selected case is not the right case type for this action');
        }
      }, error => {
        // Emit any error retrieving case data to the parent
        console.error('Unable to retrieve case data');
        console.error(error);
      });
  }

  constructor(private lasvc: LiveAppsService) {
    super(lasvc);
  }

  ngOnInit() {
    // set default layout
    // this.layout = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    // the extended class will detect change in the process and layout passed
    super.ngOnChanges(changes);
    // handle input param changes
    if ((changes.caseRef && changes.caseRef.currentValue && (changes.caseRef.currentValue !== changes.caseRef.previousValue))
      || (changes.process && changes.process.currentValue && (changes.process.currentValue !== changes.process.previousValue))) {
      // get case data if anything changes
      if (changes.process.currentValue) {
        this.getCaseData(this.caseRef);
      }
    }
  }

}
