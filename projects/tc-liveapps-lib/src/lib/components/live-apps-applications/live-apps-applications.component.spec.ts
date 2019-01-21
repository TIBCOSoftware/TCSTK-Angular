import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsApplicationsComponent } from './live-apps-applications.component';

describe('LiveAppsApplicationsComponent', () => {
  let component: LiveAppsApplicationsComponent;
  let fixture: ComponentFixture<LiveAppsApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
