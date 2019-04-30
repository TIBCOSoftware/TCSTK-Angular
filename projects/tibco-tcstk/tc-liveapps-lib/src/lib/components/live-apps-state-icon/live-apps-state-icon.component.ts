import {Component, Input, OnChanges, OnDestroy, OnInit, SecurityContext, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsService} from '../../services/live-apps.service';
import {Location} from '@angular/common';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';
import {GENERIC_CASETYPE_ICON_SVG, GENERIC_STATE_ICON_SVG} from '../../services/tc-case-card-config.service';

@Component({
  selector: 'tcla-live-apps-state-icon',
  templateUrl: './live-apps-state-icon.component.html',
  styleUrls: ['./live-apps-state-icon.component.css']
})
export class LiveAppsStateIconComponent extends LiveAppsComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() iconPath: string;
  @Input() color: string;
  @Input() iconHostURL: string;
  @Input() appId: string;

  public iconSVG: SafeHtml;
  public svgcontents: string = undefined;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private liveapps: LiveAppsService, private location: Location) {
    super();
  }

  public refillSVG = function(fill) {
    const updatedsvg = this.svgcontents.replace('fill="<DYNAMICFILL>"', 'fill="' + fill + '"');
    const newval = this.sanitizer.bypassSecurityTrustHtml(updatedsvg);
    this.iconSVG = newval;
  };

  public refresh = (icon, fill) => {
    let url: string;
    if (icon && icon !== 'assets/icons/ic-generic-casetype.svg' && icon !== 'assets/icons/ic-generic-state.svg') {
      if (icon.slice(0, 13) === 'assets/icons/') {
        // if icon is in assets folder we need to prepare the Url
        url = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, icon);
      } else {
        url = '/' + icon;
      }
      this.liveapps.getIconSVGText(url)
        .pipe(
          take(1),
          takeUntil(this._destroyed$),
          map(val => {
              this.svgcontents = val;
              val = val.toString().replace('fill="<DYNAMICFILL>"', 'fill="' + fill + '"');
              const newval = this.sanitizer.bypassSecurityTrustHtml(val);
              return newval;
            }
          )
        )
        .subscribe(val => {
            this.iconSVG = val;
          }
          , error => {
            console.log('Unable to retrieve icon: ' + error.errorMsg);
          }
        );
    } else {
      // use generic icon
      let svgcontents: string;
      if (icon === 'assets/icons/ic-generic-casetype.svg') {
        svgcontents = GENERIC_CASETYPE_ICON_SVG;
      } else {
        svgcontents = GENERIC_STATE_ICON_SVG;
      }
      this.svgcontents = svgcontents;
      svgcontents = svgcontents.replace('fill="<DYNAMICFILL>"', 'fill="' + fill + '"');
      const newval = this.sanitizer.bypassSecurityTrustHtml(svgcontents);
      this.iconSVG = newval;
    }
  }


  ngOnInit() {
    // this.refresh(this.iconPath, this.color);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.iconPath && (changes.iconPath.currentValue !== changes.iconPath.previousValue)) || (changes.color && (changes.color.currentValue !== changes.color.previousValue))) {
      this.refresh(this.iconPath, this.color);
    }
  }

}
