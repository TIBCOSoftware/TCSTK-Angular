import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TcCoreCommonFunctions} from '../../common/tc-core-common-functions';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'tc-tibco-cloud-help-archive',
  templateUrl: './tibco-cloud-help-archive.component.html',
  styleUrls: ['./tibco-cloud-help-archive.component.css']
})
export class TibcoCloudHelpArchiveComponent implements OnChanges {

  @Input() url: string;

  public article: string;

  constructor(protected http: HttpClient, protected location: Location, protected sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.url) {
      this.loadContent(this.url).subscribe(
        next => {
          this.article = next;
        }
      );
    }
  }

  private loadContent(url): Observable<any> {
    return this.http.get(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, url), {responseType: 'text'}).pipe(
      map(cont => {
          const article = this.sanitizer.bypassSecurityTrustHtml(cont);
          return article;
        }
      ),
      catchError(err => {
        console.warn('Help file not found: ', url);
        const article = this.sanitizer.bypassSecurityTrustHtml('<p>Missing help file</p>');
        return of(article);
      })
    );
  }

}
