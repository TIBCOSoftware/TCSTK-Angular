import {Inject, Injectable, ElementRef} from '@angular/core';
import {Observable, combineLatest, concat, defer, of, fromEvent, Observer } from 'rxjs';
import { map, flatMap, distinctUntilChanged, tap} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';


@Injectable()
export class TcVisibilityService {

  private pageVisible$: Observable<boolean>;

  constructor(@Inject(DOCUMENT) document: any) {
    this.pageVisible$ = concat(
      defer(() => of(!document.hidden)),
      fromEvent(document, 'visibilitychange')
        .pipe(
          map(e => !document.hidden)
        )
    );
  }

  elementInSight(element: ElementRef): Observable<boolean> {

    const elementVisible$ = Observable.create(observer => {
      const intersectionObserver = new IntersectionObserver(entries => {
        observer.next(entries);
      });

      intersectionObserver.observe(element.nativeElement);

      return () => { intersectionObserver.disconnect(); };

    })
      .pipe (
        flatMap((entries: IntersectionObserverEntry[]) => entries),
        map((entry: IntersectionObserverEntry) => {
          return entry.isIntersecting;
        }),
        distinctUntilChanged()
      );

    const elementInSight$ = combineLatest(
      this.pageVisible$,
      elementVisible$,
      (pageVisible, elementVisible: boolean) => pageVisible && elementVisible
    ).pipe(
      distinctUntilChanged()
    );

    return elementInSight$;
  }

}
