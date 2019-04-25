import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseOverviewReportComponent } from './live-apps-case-overview-report.component';

describe('LiveAppsCaseOverviewReportComponent', () => {
  let component: LiveAppsCaseOverviewReportComponent;
  let fixture: ComponentFixture<LiveAppsCaseOverviewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseOverviewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseOverviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
