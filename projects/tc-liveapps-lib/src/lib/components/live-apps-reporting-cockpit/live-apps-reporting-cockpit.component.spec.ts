import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsReportingCockpitComponent } from './live-apps-reporting-cockpit.component';

describe('LiveAppsReportingCockpitComponent', () => {
  let component: LiveAppsReportingCockpitComponent;
  let fixture: ComponentFixture<LiveAppsReportingCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsReportingCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsReportingCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
