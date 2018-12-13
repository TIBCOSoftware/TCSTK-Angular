import {Component, Input, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {Subject} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-live-apps-state-icon',
  templateUrl: './live-apps-state-icon.component.html',
  styleUrls: ['./live-apps-state-icon.component.css']
})
export class LiveAppsStateIconComponent implements OnInit, OnDestroy {

  @Input() iconPath: string;
  @Input() color: string;
  @Input() iconHostURL: string;

  private iconSVG: SafeHtml;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit() {
    const url = this.iconPath;
    const headers = new HttpHeaders().set('cacheResponse', 'true');
    this.http.get(url, {responseType: 'text', headers: headers } )
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(val => {
          val = val.toString().replace('fill="<DYNAMICFILL>"', 'fill="' + this.color + '"');
          const newval = this.sanitizer.bypassSecurityTrustHtml(val);

            return newval;
          }
        )
      )
      .subscribe(val => {
          this.iconSVG = val;
        }
      , error => { console.log('Unable to retrieve icon: ' + error.errorMsg); }
      );
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
