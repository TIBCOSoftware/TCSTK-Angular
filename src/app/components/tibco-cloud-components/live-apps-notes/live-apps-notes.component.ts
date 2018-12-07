import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {Note, NoteThread, ThreadList} from '../../../models/liveappsdata';

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
  private newNote: any = {};
  private newNoteId: number;
  private delNoteId: number;
  private threads: ThreadList;



  // use the _destroyed$/takeUntil pattern to avoid memory leaks if a response was never received
  private _destroyed$ = new Subject();

  constructor(private liveapps: LiveAppsService) { }

  public refresh = () => {
    this.liveapps.getThreads(this.relatedItemType, this.relatedItemId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(threadList => {
          this.threads = threadList;
        })
      ).subscribe(null, error => {
        this.errorMessage = 'Error retrieving notes: ' + error.error.errorMsg;
      });
  }

  private toggleReplies = (thread) => {
    thread.showReplies = !thread.showReplies;
  }

  private createThread = (noteText) => {
    if (noteText !== undefined) {
      this.liveapps.createNote(this.relatedItemType, 'RT_CASE', this.relatedItemId, 'comments update', '', '', noteText)
        .pipe(
          take(1),
          takeUntil(this._destroyed$),
          map(result => {
            this.newNoteId = result;
            this.refresh();
            this.newNote.text = undefined;
            // todo: should now go and get the new note
          })
        )
        .subscribe(null, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
    }
  }

  private updateNote = (note) => {
    console.log('Updating note');
    this.liveapps.updateNote(note, note.id)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          console.log('Note updated');
        })
      )
      .subscribe(null, error => this.errorMessage = 'Error updating note: ' + error.error.errorMessage);
  }

  private deleteNote = () => {
    console.log('Deleting note');
    this.liveapps.deleteNote(this.delNoteId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          console.log('Note deleted: ' + result);
        })
      )
      .subscribe(null, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }

}
