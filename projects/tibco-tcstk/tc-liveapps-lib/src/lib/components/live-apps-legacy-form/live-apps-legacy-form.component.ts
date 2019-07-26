import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcComponent, TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';
import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {map} from 'rxjs/internal/operators/map';
import {defer} from 'rxjs/internal/observable/defer';
import {concat} from 'rxjs/internal/operators/concat';
import {of} from 'rxjs/internal/observable/of';
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
export class LiveAppsLegacyFormComponent extends LiveAppsComponent implements OnDestroy, OnInit, AfterViewInit {

  @Input() legacyIframeId = this.legacyIframeId ?  this.legacyIframeId : 'legacyFrame';
  @Input() workitemId: number;

  private target;
  private formDiv;
  private wiActive = false;

  constructor (private visibilityService: TcVisibilityService, private host: ElementRef) {
    super();
  }

  renderWi = (wiId: number) => {
    // send message to external form app
    console.log('send msg');
    this.formDiv.contentWindow.postMessage({ 'action': 'openWI', 'wiId': wiId}, '*');
    window.addEventListener('message', this.receiveMessage, false);
    // position the form iframe over the workitemDiv placeholder
    this.wiActive = true;
    this.resizeWi();
  }

  receiveMessage = (event) => {
    if (event.data.action === 'wiCompleted') {
      console.log(event);
    }
  }

  cancelWi = (wiId) => {
    this.formDiv.contentWindow.postMessage({ 'action': 'cancelWI', 'wiId': wiId}, '*');
    this.wiActive = false;
    this.hideWi();
  }

  hideWi = () => {
  // hide the iframe!
      this.formDiv.style.top = '-1000px';
      this.formDiv.style.left = '-1000px';
      this.formDiv.style.zIndex = '1';
  }

  resizeWi = () => {
    // position the form iframe over the workitemDiv placeholder
    setTimeout(handler => {
      const rect = this.target.getBoundingClientRect();
      this.formDiv.style.top = rect.top.toString() + 'px';
      this.formDiv.style.left = rect.left.toString() + 'px';
      this.formDiv.style.height = rect.height.toString() + 'px';
      this.formDiv.style.width = rect.width.toString() + 'px';
      this.formDiv.style.position = 'absolute';
      this.formDiv.style.zIndex = '10000';
    }, 1000);
  }

  ngOnDestroy() {
    console.log('destroyed');
    this.cancelWi(this.workitemId);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.containerChanges$.subscribe(widget => {
      if (this.wiActive && this.target) {
        this.resizeWi();
      }
    });
    const inSight$ = this.visibilityService.elementInSight(this.host);
    inSight$.subscribe(next => {
      console.log('INSIGHT: ', next);
        if (!next) {
          if (this.wiActive && this.target) {
            this.hideWi();
          }
        } else {
          if (!this.wiActive) {
            this.target = document.getElementById('componentDiv');
            this.formDiv = document.getElementById(this.legacyIframeId);
            this.renderWi(this.workitemId);
          } else {
            this.resizeWi();
          }
        }
    });
  }

  ngOnInit() {
  }
}
