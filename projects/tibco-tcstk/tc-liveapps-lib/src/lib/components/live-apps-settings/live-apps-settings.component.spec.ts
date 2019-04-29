import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsSettingsComponent } from './live-apps-settings.component';

describe('LiveAppsComponentSettings', () => {
  let component: LiveAppsSettingsComponent;
  let fixture: ComponentFixture<LiveAppsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
