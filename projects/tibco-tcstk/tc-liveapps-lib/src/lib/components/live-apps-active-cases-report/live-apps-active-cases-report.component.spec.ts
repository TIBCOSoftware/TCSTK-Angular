import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsActiveCasesReportComponent } from './live-apps-active-cases-report.component';

describe('LiveAppsActiveCasesReportComponent', () => {
  let component: LiveAppsActiveCasesReportComponent;
  let fixture: ComponentFixture<LiveAppsActiveCasesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsActiveCasesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsActiveCasesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
