import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCreatorDialogComponent } from './live-apps-creator-dialog.component';

describe('LiveAppsCreatorDialogComponent', () => {
  let component: LiveAppsCreatorDialogComponent;
  let fixture: ComponentFixture<LiveAppsCreatorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCreatorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCreatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
