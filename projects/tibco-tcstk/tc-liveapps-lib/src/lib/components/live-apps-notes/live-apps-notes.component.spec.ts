import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsNotesComponent } from './live-apps-notes.component';

describe('LiveAppsNotesComponent', () => {
  let component: LiveAppsNotesComponent;
  let fixture: ComponentFixture<LiveAppsNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
