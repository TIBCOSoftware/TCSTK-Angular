import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-live-apps-notes-editor',
  templateUrl: './live-apps-notes-editor.component.html',
  styleUrls: ['./live-apps-notes-editor.component.css']
})
export class LiveAppsNotesEditorComponent implements OnInit {
  @Input() noteText: string; // use 'CASE_APP' to share notes with case manager
  @Input() isReply = false;
  @Output() noteSubmitted = new EventEmitter(); // notify text submitted

  constructor() { }

  private submitNote = (noteText) => {
    this.noteSubmitted.emit(noteText);
  }

  ngOnInit() {
  }

}
