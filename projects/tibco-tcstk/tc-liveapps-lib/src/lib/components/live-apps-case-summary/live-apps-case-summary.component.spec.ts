import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseSummaryComponent } from './live-apps-case-summary.component';

describe('LiveAppsCaseSummaryComponent', () => {
  let component: LiveAppsCaseSummaryComponent;
  let fixture: ComponentFixture<LiveAppsCaseSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
