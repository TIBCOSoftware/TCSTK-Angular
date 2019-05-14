
import {Component, OnDestroy } from '@angular/core';
import {Subject} from 'rxjs';


/**
 * Generic component extended by others
 *
 *@example <tcla-live-apps-component></tcla-live-apps-component>
 */
@Component({
  selector: 'tcla-live-apps-component',
  templateUrl: './live-apps-component.component.html',
  styleUrls: ['./live-apps-component.component.css']
})

/**
 * Class Description of the Component
 */
export class LiveAppsComponent implements OnDestroy {

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  protected _destroyed$ = new Subject();

  constructor() { }

  ngOnDestroy() {
    // on destroy
    this._destroyed$.next();
  }

}
