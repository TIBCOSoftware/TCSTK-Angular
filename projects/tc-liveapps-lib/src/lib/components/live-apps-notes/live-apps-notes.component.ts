import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {Note, NoteThread, NotificationList, ThreadList} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';

@Component({
  selector: 'tcla-live-apps-notes',
  templateUrl: './live-apps-notes.component.html',
  styleUrls: ['./live-apps-notes.component.css']
})

export class LiveAppsNotesComponent extends LiveAppsComponent implements OnInit {
  @Input() relatedItemType: string; // use 'CASE_APP' to share notes with case manager
  @Input() relatedItemId: string; // 'caseRef' for case related
  @Input() userId: string;

  public notes: Note[];
  public errorMessage: string;
  public newNote: any = {};
  public newNoteId: number;
  public delNoteId: number;
  public threads: ThreadList;
  public subscribed: Boolean;

  constructor(private liveapps: LiveAppsService) {
    super();
  }

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

  public toggleReplies = (thread) => {
    thread.showReplies = !thread.showReplies;
  }

  public toggleNewReply = (thread) => {
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

  public createReply = (thread, replyText) => {
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

  public createThread = (noteText) => {
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

  public getNotifications = () => {
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

  public subscribe = () => {
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

  public unsubscribe = () => {
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

  public editNote = (thread) => {
    thread.editMode = !thread.editMode;
  }

  public updateNote = (note, updatedText) => {
    console.log('Updating note');
    note.text = updatedText;
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

  public deleteNote = (id) => {
    console.log('Deleting note');
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
    this.newNote.text = '';
  }

}
