import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TcCoreCommonFunctions} from '../../common/tc-core-common-functions';
import {Location} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'tc-tibco-cloud-help-side-bar',
  templateUrl: './tibco-cloud-help-side-bar.component.html',
  styleUrls: ['./tibco-cloud-help-side-bar.component.css']
})
export class TibcoCloudHelpSideBarComponent implements OnChanges {

  @Input() helpSettingsUrl: string;

  constructor(protected location: Location, protected sanitizer: DomSanitizer, protected http: HttpClient) {
  }

  public selectedItem: any;
  public helpConfig: any;
  public inline: any[] = [];

  toggleArticle(item: any) {
    item.open = !item.open;
  }

  loadContent(item: any): Observable<any> {
    if (!item.article) {
      item.article = '';
      return this.http.get(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, item.url), {responseType: 'text'}).pipe(
        map(cont => {
            item.article = this.sanitizer.bypassSecurityTrustHtml(cont);
            return cont;
          }
        ),
        catchError(err => {
          console.error('Help file not found: ', item.url);
          item.article = this.sanitizer.bypassSecurityTrustHtml('<p>Missing help file</p>');
          return of(item.article);
        })
      );
    } else {
      return of(item.article);
    }
  }

  prepareIconLink(url): string {
    return TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, url);
  }

  togglePlaying(item: any, playing: boolean) {
    item.playing = playing;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.helpSettingsUrl) {
      this.http.get(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, this.helpSettingsUrl)).subscribe(
        next => {
          this.helpConfig = next;
        }
      );
    }
  }

}
