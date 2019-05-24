import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';


/**
 * Editor component to edit a note
 *
 * ![alt-text](../live-apps-notes-editor.png "")
 *
 *@example <tcla-live-apps-notes-editor></tcla-live-apps-notes-editor>
 */
@Component({
  selector: 'tcla-live-apps-notes-editor',
  templateUrl: './live-apps-notes-editor.component.html',
  styleUrls: ['./live-apps-notes-editor.component.css']
})
export class LiveAppsNotesEditorComponent extends LiveAppsComponent {
  @Input() noteText: string; // use 'CASE_APP' to share notes with case manager
  @Input() isReply = false;

  /**
   * ~event noteSubmitted : Internal
   */

  @Output() noteSubmitted = new EventEmitter(); // notify text submitted

  constructor() {
    super();
  }

  public submitNote = (noteText) => {
    this.noteSubmitted.emit(noteText);
  }

}
