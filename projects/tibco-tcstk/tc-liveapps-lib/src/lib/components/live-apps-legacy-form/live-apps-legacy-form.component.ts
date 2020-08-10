import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {LegacyIframeService, TcComponent, TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';
import {TcVisibilityService} from '@tibco-tcstk/tc-core-lib';

/**
 * Wraps legacy angularjs form renderer
 *
 *@example <tcla-live-apps-legacy-form></tcla-live-apps-legacy-form>
 */

@Component({
  selector: 'tcla-live-apps-legacy-form',
  templateUrl: './live-apps-legacy-form.component.html',
  styleUrls: ['./live-apps-legacy-form.component.css']
})
export class LiveAppsLegacyFormComponent extends LiveAppsComponent implements OnDestroy, OnDestroy, AfterViewInit {

  public legacyIframeId: string = 'legacyWorkitemFrame';
  @Input('legacyIframeId') set LegacyIframeId(legacyIframeId: string) {
    if (legacyIframeId){
      this.legacyIframeId = legacyIframeId;
    }
  }

  @Input() workitemId: number;
  @Output() workitemComplete = new EventEmitter();

  private target;
  private formDiv;
  private wiActive = false;
  private openWiId;

  constructor (protected visibilityService: TcVisibilityService, protected host: ElementRef, protected legacyIframeService: LegacyIframeService) {
    super();
  }

  public isFormActive() {
    return this.wiActive;
  }

  public renderWi = (wiId: number) => {
    if (this.wiActive && this.openWiId) {
      // opening a new workitem so cancel old one
      this.cancelWi(wiId);
    }

    // send message to external form app
    this.formDiv.contentWindow.postMessage({ 'action': 'openWI', 'wiId': wiId}, window.location.origin);
    // position the form iframe over the workitemDiv placeholder
    this.wiActive = true;
    this.openWiId = wiId;
    this.resizeWi();
  }

  private receiveMessage = (event) => {
    if (event.data.action === 'wiCompleted') {
      this.wiActive = false;
      const wiId = this.openWiId;
      this.openWiId = undefined;
      this.hideWi();
      this.workitemComplete.emit(wiId);
    }
  }

  public cancelWi = (wiId) => {
    this.formDiv.contentWindow.postMessage({ 'action': 'cancelWI', 'wiId': this.openWiId}, window.location.origin);
    this.wiActive = false;
    this.openWiId = undefined;
    this.hideWi();
  }

  private hideWi = () => {
  // hide the iframe!
      this.formDiv.style.top = '-1000px';
      this.formDiv.style.left = '-1000px';
      this.formDiv.style.zIndex = '1';
  }

  private resizeWi = () => {
    // position the form iframe over the workitemDiv placeholder
    setTimeout(handler => {
      const rect = this.target.getBoundingClientRect();
      this.formDiv.style.top = rect.top.toString() + 'px';
      this.formDiv.style.left = rect.left.toString() + 'px';
      this.formDiv.style.height = rect.height.toString() + 'px';
      this.formDiv.style.width = rect.width.toString() + 'px';
      this.formDiv.style.position = 'absolute';
      this.formDiv.style.zIndex = '1000';
    }, 1000);
  }

  private initialize = () => {
    // listen for messages from the iframe
    window.addEventListener('message', this.receiveMessage, false);

    // we only want to render the workitem when the element is visible
    const inSight$ = this.visibilityService.elementInSight(this.host);
    inSight$.subscribe(next => {
      if (!next) {
        // element not visible so hide the workitem if it is showing
        if (this.wiActive && this.target) {
          this.hideWi();
        }
      } else {
        // element is visible
        if (!this.wiActive) {
          // if workitem not already showing - show it
          // first get a handle on the target div and the legacy iframe
          this.target = document.getElementById('workitemDiv');
          this.formDiv = document.getElementById(this.legacyIframeId);
          if (this.workitemId) {
            // trigger display of the workitem
            this.renderWi(this.workitemId);
          }
        } else {
          this.resizeWi();
        }
      }
    });
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.containerChanges$.subscribe(widget => {
      if (this.wiActive && this.target) {
        this.resizeWi();
      }
    });

    // wait for iframe to load before doing anything else
    // this observable will emit true once the iFrame is loaded
    this.legacyIframeService.workitemStatus.subscribe(loaded => {
      if (loaded) {
        // iframe is loaded
        this.initialize();
      }
    });
  }

  ngOnDestroy() {
    if (this.openWiId) {
      this.cancelWi(this.workitemId);
    }
  }
}
