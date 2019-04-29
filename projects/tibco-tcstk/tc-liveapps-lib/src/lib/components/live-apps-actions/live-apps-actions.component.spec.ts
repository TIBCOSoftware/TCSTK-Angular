import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsActionsComponent } from './live-apps-actions.component';

describe('LiveAppsActionsComponent', () => {
  let component: LiveAppsActionsComponent;
  let fixture: ComponentFixture<LiveAppsActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
