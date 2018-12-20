import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsService} from '../../../services/live-apps.service';

@Component({
  selector: 'app-live-apps-favorite-cases',
  templateUrl: './live-apps-favorite-cases.component.html',
  styleUrls: ['./live-apps-favorite-cases.component.css']
})
export class LiveAppsFavoriteCasesComponent implements OnInit, OnDestroy {
  @Input() sandboxId: number;
  @Input() uiAppId: string;
  @Output() clickCase = new EventEmitter;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  private favoriteCases: string[];
  private errorMessage: string;

  private clickCaseAction = (caseReference) => {
    this.clickCase.emit(caseReference);
  }


  public refresh = () => {
    this.favoriteCases = [];
    this.liveapps.getFavoriteCases(this.uiAppId, this.sandboxId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(favoriteCases => {
          this.favoriteCases = favoriteCases.caseRefs || [];
        })
      ).subscribe(
      null, error => { this.errorMessage = 'Error retrieving favorite cases: ' + error.error.errorMsg; });
  }

  public clearFavoriteCases = () => {
    this.liveapps.setFavoriteCase('-1', this.uiAppId, this.sandboxId);
    this.favoriteCases = [];
  }


  constructor(private liveapps: LiveAppsService) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
