import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {LiveAppsService} from '../../services/live-apps.service';
import {map, take, takeUntil} from 'rxjs/operators';
import {Note, NoteThread, NotificationList, ThreadList} from '../../models/liveappsdata';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {ToolbarButton} from '@tibco-tcstk/tc-core-lib';
import {TcButtonsHelperService} from '@tibco-tcstk/tc-core-lib';


/**
 * This Component allows to list, and add Notes to a Case-Instance or other Context e.g. a whole Application.
 * Any Note can have Sub-Notes to allow real collaboration.
 *
 * Note that since this component uses a virtual scroll the parent container must have height set or the notes won't appear
 *
 * ![alt-text](../live-apps-notes.png "Notes Component Image")
 *
 *@example <tcla-live-apps-notes></tcla-live-apps-notes>
 */
@Component({
  selector: 'tcla-live-apps-notes',
  templateUrl: './live-apps-notes.component.html',
  styleUrls: ['./live-apps-notes.component.css']
})

export class LiveAppsNotesComponent extends LiveAppsComponent implements OnInit {
  /**
   * itemType for notes collection
   */
  @Input() relatedItemType: string; // use 'CASE_APP' to share notes with case manager

  /**
   * itemId for notes collection
   */
  @Input() relatedItemId: string; // 'caseRef' for case related

  /**
   * The ID of the logged user
   */
  @Input() userId: string;

  /**
   * Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
   */
  @Input() showHeader: boolean = this.showHeader ? this.showHeader : true;

  /**
   * The header text as input, defaults to 'Notes'
   */
  @Input() header: string = this.header ? this.header : 'Notes';

  public notes: Note[];
  public errorMessage: string;
  public newNote: any = {};
  public newNoteId: number;
  public delNoteId: number;
  public threads: ThreadList;
  public subscribed: Boolean;
  public skip = 0;
  public top = 20;
  public end = false;
  public toolbarButtons: ToolbarButton[] = [];

  constructor(protected liveapps: LiveAppsService, protected buttonsHelper: TcButtonsHelperService) {
    super();
  }

  public refresh = () => {
    this.skip = 0;
    this.top = 20;
    this.end = false;
    if (this.threads && this.threads.threads) {
      this.threads.threads.length = 0;
    }
    this.getBatch();
    this.getNotifications();
  }

  public getBatch = () => {
    if (!this.end) {
      this.liveapps.getThreads(this.relatedItemType, this.relatedItemId, this.skip, this.top)
        .pipe(
          take(1),
          takeUntil(this._destroyed$)
        ).subscribe(threadList => {
        if (!this.threads) {
          this.threads = threadList;
        } else {
          // this will strip any duplicates that may have been retrieved due to fast scrolling
          const filteredEvents = threadList.threads.filter(x => this.threads.threads.every(y => y.note.id !== x.note.id));
          this.threads.threads = this.threads.threads.concat(filteredEvents);
        }
        if (threadList.threads.length < this.top) {
          this.end = true;
        } else {
          this.skip = this.skip + threadList.threads.length - 1;
        }
      }, error => {
        this.errorMessage = 'Error retrieving notes: ' + error.error.errorMsg;
      });
    }
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
        takeUntil(this._destroyed$)
      )
      .subscribe(result => {
        this.newNoteId = result;
        thread.newReply.text = undefined;
        this.refresh();
      }, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
  }

  public createThread = (noteText) => {
    if (noteText !== undefined) {
      this.liveapps.createNote(this.relatedItemType, 'RT_CASE', this.relatedItemId, 'comments update', '', '', noteText)
        .pipe(
          take(1),
          takeUntil(this._destroyed$)
        )
        .subscribe(result => {
          this.newNoteId = result;
          this.newNote.text = undefined;
          this.refresh();
        }, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
    }
  }


  protected createToolbarButtons = (subscribed): ToolbarButton[] => {
    const subscribeButton: ToolbarButton = this.buttonsHelper.createButton(
      'subscribe', 'tcs-collaboration-unsubscribed', true, 'Enable Notifications', !subscribed, !subscribed);
    const unSubscribeButton: ToolbarButton = this.buttonsHelper.createButton(
      'unsubscribe', 'tcs-collaboration-subscribed', true, 'Disable Notifications', subscribed, subscribed);
    const buttons = [ subscribeButton, unSubscribeButton ];
    return buttons;
  }

  public setupNotificationButtons = (subscribed: boolean) => {
    const buttons: ToolbarButton[] = this.createToolbarButtons(subscribed);
    this.buttonsHelper.updateButtons(buttons, this.toolbarButtons);
  }

  public updateButtonDef = (updatedToolbarButtons: ToolbarButton[]) => {
    updatedToolbarButtons.forEach( updatedButton => {
      const idx = this.toolbarButtons.findIndex(item => item.id === updatedButton.id);
      this.toolbarButtons[idx] = updatedButton;
    });
  }

  public handleToolbarButtonEvent = (id) => {
    if (id === 'subscribe') {
      this.subscribe();
    } else if (id === 'unsubscribe') {
      this.unsubscribe();
    }
  }

  public recreateButtonsForNotifications = (subscribed) => {
      const buttons: ToolbarButton[] = this.createToolbarButtons(subscribed);
      this.buttonsHelper.updateButtons(buttons, this.toolbarButtons);
  }

  public getNotifications = () => {
    this.liveapps.getNotifications(this.relatedItemType, this.relatedItemId, this.userId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      )
      .subscribe(result => {
        const notificationList: NotificationList = result;
        if (notificationList.notifications.length > 0) {
          this.subscribed = true;
          this.setupNotificationButtons(true);
        } else {
          this.subscribed = false;
          this.setupNotificationButtons(false);
        }
      }, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
  }

  public subscribe = () => {
    this.liveapps.subscribeToNotes(this.relatedItemType, this.relatedItemId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      )
      .subscribe(result => {
        if (result) {
          this.subscribed = true;
          this.recreateButtonsForNotifications(true);
        }
      }, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
  }

  public unsubscribe = () => {
    this.liveapps.unsubscribeToNotes(this.relatedItemType, this.relatedItemId, this.userId)
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      )
      .subscribe(result => {
        this.subscribed = false;
        this.recreateButtonsForNotifications(false);
      }, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
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
        takeUntil(this._destroyed$)
      )
      .subscribe(result => {
        console.log('Note updated');
        this.refresh();
      }, error => this.errorMessage = 'Error updating note: ' + error.error.errorMessage);
  }

  public deleteNote = (id) => {
    console.log('Deleting note');
    this.liveapps.deleteNote(id)
      .pipe(
        take(1),
        takeUntil(this._destroyed$)
      )
      .subscribe(result => {
        console.log('Note deleted: ' + result);
        this.refresh();
      }, error => this.errorMessage = 'Error creating new note: ' + error.error.errorMessage);
  }

  ngOnInit() {
    // this.refresh();
    this.newNote.text = '';

  }

}
