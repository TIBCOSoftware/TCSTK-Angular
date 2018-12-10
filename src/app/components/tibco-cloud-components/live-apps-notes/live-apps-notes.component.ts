import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {Note, NoteThread, NotificationList, ThreadList} from '../../../models/liveappsdata';

@Component({
  selector: 'app-live-apps-notes',
  templateUrl: './live-apps-notes.component.html',
  styleUrls: ['./live-apps-notes.component.css']
})

export class LiveAppsNotesComponent implements OnInit, OnDestroy {
  @Input() relatedItemType: string; // use 'CASE_APP' to share notes with case manager
  @Input() relatedItemId: string; // 'caseRef' for case related
  @Input() userId: string;

  private notes: Note[];
  private errorMessage: string;
  private newNote: any = {};
  private newNoteId: number;
  private delNoteId: number;
  private threads: ThreadList;
  private subscribed: Boolean;

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
    this.getNotifications();
  }

  private toggleReplies = (thread) => {
    thread.showReplies = !thread.showReplies;
  }

  private toggleNewReply = (thread) => {
    if (!thread.newReply) {
      thread.newReply = {};
    }
    if (thread.showReplies && !thread.showNewReply) {
      thread.newReply = {};
      thread.showNewReply = true;
    } else {
      thread.showNewReply = !thread.showNewReply;
      thread.showReplies = !thread.showReplies;
    }

  }

  private createReply = (thread, replyText) => {
    this.liveapps.createReplyNote(thread.note, replyText, thread.note.id)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          this.newNoteId = result;
          thread.newReply.text = undefined;
          this.refresh();
        })
      )
      .subscribe(null, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
  }

  private createThread = (noteText) => {
    if (noteText !== undefined) {
      this.liveapps.createNote(this.relatedItemType, 'RT_CASE', this.relatedItemId, 'comments update', '', '', noteText)
        .pipe(
          take(1),
          takeUntil(this._destroyed$),
          map(result => {
            this.newNoteId = result;
            this.newNote.text = undefined;
            this.refresh();
          })
        )
        .subscribe(null, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
    }
  }

  private getNotifications = () => {
    this.liveapps.getNotifications(this.relatedItemType, this.relatedItemId, this.userId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          const notificationList: NotificationList = result;
          if (notificationList.notifications.length > 0) {
            this.subscribed = true;
          }
        })
      )
      .subscribe(null, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
  }

  private subscribe = () => {
    this.liveapps.subscribeToNotes(this.relatedItemType, this.relatedItemId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          if (result) {
            this.subscribed = true;
          }
        })
      )
      .subscribe(null, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
  }

  private unsubscribe = () => {
    this.liveapps.unsubscribeToNotes(this.relatedItemType, this.relatedItemId, this.userId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          this.subscribed = false;
        })
      )
      .subscribe(null, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
  }

  private editNote = (thread) => {
    thread.editMode = !thread.editMode;
  }

  private updateNote = (note) => {
    console.log('Updating note');
    this.liveapps.updateNote(note, note.id)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          console.log('Note updated');
          this.refresh();
        })
      )
      .subscribe(null, error => this.errorMessage = 'Error updating note: ' + error.error.errorMessage);
  }

  private deleteNote = (id) => {
    console.log('Deleting thread');
    this.liveapps.deleteNote(id)
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        map(result => {
          console.log('Note deleted: ' + result);
          this.refresh();
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
