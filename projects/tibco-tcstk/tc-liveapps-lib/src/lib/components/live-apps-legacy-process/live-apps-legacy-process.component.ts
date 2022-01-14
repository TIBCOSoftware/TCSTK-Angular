import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {LegacyIframeService} from '@tibcosoftware/tc-core-lib';
import {TcVisibilityService} from '@tibcosoftware/tc-core-lib';
import {LaProcessSelection} from '../../models/tc-case-processes';

/**
 * Wraps legacy angularjs form renderer
 *
 *@example <tcla-live-apps-legacy-form></tcla-live-apps-legacy-form>
 */

@Component({
  selector: 'tcla-live-apps-legacy-process',
  templateUrl: './live-apps-legacy-process.component.html',
  styleUrls: ['./live-apps-legacy-process.component.css']
})
export class LiveAppsLegacyProcessComponent extends LiveAppsComponent implements OnDestroy, OnDestroy, AfterViewInit {

  public legacyIframeId: string = 'legacyProcessFrame';
  @Input('legacyIframeId') set LegacyIframeId(legacyIframeId: string) {
    if (legacyIframeId){
      this.legacyIframeId = legacyIframeId;
    }
  }

  @Input() process: LaProcessSelection;
  @Input() type: string; // creator/process
  @Input() applicationId: string;
  @Input() typeId: string;
  @Input() caseRef: string;
  @Input() caseState: string;
  @Output() processComplete = new EventEmitter();
  @Output() processCancelled = new EventEmitter();

  private target;
  private formDiv;
  private processActive = false;
  private openProcessId;

  constructor (protected visibilityService: TcVisibilityService, protected host: ElementRef, protected legacyIframeService: LegacyIframeService) {
    super();
  }

  public isFormActive() {
    return this.processActive;
  }

  public changeProcess = (process: LaProcessSelection) => {
    // process has changed
    this.renderProcess(process);
  }

  public renderProcess = (process: LaProcessSelection) => {
    if (this.processActive && this.openProcessId) {
      // opening a new process so cancel old one
      this.cancelProcess(false);
    }

    // send message to external form app
    this.formDiv.contentWindow.postMessage({
      action: this.type === 'creator' ? 'runCreator' : 'runAction',
      processId: process.process.id,
      caseRef: this.caseRef,
      caseState: this.caseState,
      applicationId: this.applicationId,
      typeId: this.typeId
    }, window.location.origin);

    // position the form iframe over the processDiv placeholder
    this.processActive = true;
    this.openProcessId = process.process.id;
    this.resizeProcess();
  }

  private receiveMessage = (event) => {
    if (event.data.action === 'processComplete') {
      this.processActive = false;
      this.openProcessId = undefined;
      this.hideProcess();
      this.processComplete.emit();
    } else if (event.data.action === 'processCancelled') {
      this.processActive = false;
      this.openProcessId = undefined;
      this.hideProcess();
      this.processCancelled.emit();
    }
  }

  public cancelProcess = (emit?: boolean) => {
    this.formDiv.contentWindow.postMessage({ 'action': 'cancelProcess' }, window.location.origin);
    this.processActive = false;
    this.openProcessId = undefined;
    this.hideProcess();
    if (emit) {
      this.processCancelled.emit();
    }
  }

  private hideProcess = () => {
  // hide the iframe!
      this.formDiv.style.top = '-1000px';
      this.formDiv.style.left = '-1000px';
      this.formDiv.style.zIndex = '1';
  }

  private resizeProcess = () => {
    // position the form iframe over the processDiv placeholder
    setTimeout(handler => {
      const rect = this.target.getBoundingClientRect();
      this.formDiv.style.top = rect.top.toString() + 'px';
      this.formDiv.style.left = rect.left.toString() + 'px';
      this.formDiv.style.height = rect.height.toString() + 'px';
      this.formDiv.style.width = rect.width.toString() + 'px';
      this.formDiv.style.position = 'absolute';
      // creator needs 1001 so it is over the dialog box
      this.formDiv.style.zIndex = (this.type === 'creator') ? '1001' : '1000';
    }, 1000);
  }

  private initialize = () => {
    // listen for messages from the iframe
    window.addEventListener('message', this.receiveMessage, false);

    // we only want to render the process when the element is visible
    const inSight$ = this.visibilityService.elementInSight(this.host);
    inSight$.subscribe(next => {
      if (!next) {
        // element not visible so hide the process if it is showing
        if (this.processActive && this.target) {
          this.hideProcess();
        }
      } else {
        // element is visible
        if (!this.processActive) {
          // if process not already showing - show it
          // first get a handle on the target div and the legacy iframe
          this.target = document.getElementById('processDiv');
          this.formDiv = document.getElementById(this.legacyIframeId);
          if (this.openProcessId) {
            // trigger display of the process
            this.renderProcess(this.process);
          }
        } else {
          this.resizeProcess();
        }
      }
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.openProcessId = this.process.process.id;
    this.containerChanges$.subscribe(widget => {
      if (this.processActive && this.target) {
        this.resizeProcess();
      }
    });

    // wait for iframe to load before doing anything else
    // this observable will emit true once the iFrame is loaded
    this.legacyIframeService.processStatus.subscribe(loaded => {
      if (loaded) {
        // iframe is loaded
        this.initialize();
      }
    });
  }

  ngOnDestroy() {
    if (this.openProcessId) {
      this.cancelProcess();
    }
  }
}
