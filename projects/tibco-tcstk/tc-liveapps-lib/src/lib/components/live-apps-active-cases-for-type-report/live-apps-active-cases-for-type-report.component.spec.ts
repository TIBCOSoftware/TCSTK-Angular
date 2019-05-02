import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsActiveCasesForTypeReportComponent } from './live-apps-active-cases-for-type-report.component';

describe('LiveAppsActiveCasesForTypeReportComponent', () => {
  let component: LiveAppsActiveCasesForTypeReportComponent;
  let fixture: ComponentFixture<LiveAppsActiveCasesForTypeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsActiveCasesForTypeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsActiveCasesForTypeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
