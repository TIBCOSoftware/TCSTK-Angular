import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdAdministrationCaseSummaryComponent } from './pd-administration-case-summary.component';

describe('PdLiveAppsCaseSummaryComponent', () => {
  let component: PdAdministrationCaseSummaryComponent;
  let fixture: ComponentFixture<PdAdministrationCaseSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdAdministrationCaseSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdAdministrationCaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
