import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsSettingsSummaryCardsComponent } from './live-apps-settings-summary-cards.component';

describe('LiveAppsSettingsSummaryCardsComponent', () => {
  let component: LiveAppsSettingsSummaryCardsComponent;
  let fixture: ComponentFixture<LiveAppsSettingsSummaryCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsSettingsSummaryCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsSettingsSummaryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
