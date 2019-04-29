import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseTypeOverviewReportComponent } from './live-apps-case-type-overview-report.component';

describe('LiveAppsCaseTypeOverviewReportComponent', () => {
  let component: LiveAppsCaseTypeOverviewReportComponent;
  let fixture: ComponentFixture<LiveAppsCaseTypeOverviewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseTypeOverviewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseTypeOverviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
