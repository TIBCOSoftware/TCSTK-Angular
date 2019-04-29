import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsSettingsRecentCasesComponent } from './live-apps-settings-recent-cases.component';

describe('LiveAppsSettingsRecentCasesComponent', () => {
  let component: LiveAppsSettingsRecentCasesComponent;
  let fixture: ComponentFixture<LiveAppsSettingsRecentCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsSettingsRecentCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsSettingsRecentCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
