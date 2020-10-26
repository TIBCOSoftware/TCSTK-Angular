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
  public maximize = false;

  toggleArticle(item: any) {
    item.open = !item.open;
  }

  prepareIconLink(url): string {
    return TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, url);
  }

  togglePlaying(item: any, playing: boolean) {
    item.playing = playing;
  }

  toggleMaximize() {
    this.maximize = !this.maximize;
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
