import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsActiveCasesWidgetComponent } from './live-apps-active-cases-widget.component';

describe('LiveAppsActiveCasesWidgetComponent', () => {
  let component: LiveAppsActiveCasesWidgetComponent;
  let fixture: ComponentFixture<LiveAppsActiveCasesWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsActiveCasesWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsActiveCasesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
