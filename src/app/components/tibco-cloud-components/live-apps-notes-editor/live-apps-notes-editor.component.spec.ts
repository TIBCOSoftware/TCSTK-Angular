import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsNotesEditorComponent } from './live-apps-notes-editor.component';

describe('LiveAppsNotesEditorComponent', () => {
  let component: LiveAppsNotesEditorComponent;
  let fixture: ComponentFixture<LiveAppsNotesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsNotesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsNotesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
