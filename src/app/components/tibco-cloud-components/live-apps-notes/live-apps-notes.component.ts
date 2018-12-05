import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {Note} from '../../../models/liveappsdata';

@Component({
  selector: 'app-live-apps-notes',
  templateUrl: './live-apps-notes.component.html',
  styleUrls: ['./live-apps-notes.component.css']
})
export class LiveAppsNotesComponent implements OnInit, OnDestroy {
  @Input() relatedItemType: string; // use 'CASE_APP' to share notes with case manager
  @Input() relatedItemId: string; // 'caseRef' for case related

  private notes: Note[];
  private errorMessage: string;

  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  constructor(private liveapps: LiveAppsService) { }

  public refresh = () => {
    this.liveapps.getNotes(this.relatedItemType, this.relatedItemId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(noteslist => {
          this.notes = noteslist.notes;
        })
      ).subscribe(null, error => { this.errorMessage = 'Error retrieving case states: ' + error.error.errorMsg; });
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
