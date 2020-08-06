
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild, ViewChildren
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {debounceTime, map} from 'rxjs/operators';
import {TcComponent} from '@tibco-tcstk/tc-core-lib';


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
export class LiveAppsComponent implements OnDestroy, AfterViewInit, OnInit {

  @ViewChild('componentDiv') componentDiv: ElementRef;
  @ViewChildren('componentChildDiv') componentChildDivs: LiveAppsComponent[];

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  protected _destroyed$ = new Subject();
  protected containerChanges$: Observable<TcComponent>;
  public widget: TcComponent;
  private observer;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // window resize changes
    if (this.observer) {
      setTimeout(handler => {
        this.observer.next(this.componentDiv.nativeElement.offsetWidth);
      });
    }
  }

  constructor() { }

  public resize = () => {
    // explicit size changes
    if (this.observer) {
      setTimeout(handler => {
        this.observer.next(this.componentDiv.nativeElement.offsetWidth);
      });
    }
    this.componentChildDivs.forEach(child => {
      if (child.resize) {
        child.resize();
      }
    });
  }

  setupWidthObserver() {
    this.containerChanges$ = new Observable<number>(observer => {
      if (!this.observer) {
        this.observer = observer;
      }
      // send initial value - need async so any flex items have resized
      setTimeout(handler => {
        observer.next(this.componentDiv.nativeElement.offsetWidth);
      });
    }).pipe(
      distinctUntilChanged(),
      map(width => {
        if (this.widget && width) {
          this.widget.width = width;
        }
        return this.widget;
      }
    )
    );
  }

  ngAfterViewInit() {
    // components that extend this can use the widget.width object to detect size of container by subscribing to containerChanges$
    // we detect div size changes using two methods:
    // 1: if window resizes
    // 2: if a manual resize of the element is triggered - this.resize() - (example - from a button in UI)
    this.setupWidthObserver();
  }

  ngOnDestroy() {
    // on destroy
    this._destroyed$.next();
  }

  ngOnInit() {
    this.widget = new TcComponent();
  }

}
