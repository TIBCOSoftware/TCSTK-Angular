import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCwmServicesComponent } from './settings-spotfire.component';

describe('SettingsSpotfireComponent', () => {
  let component: SettingsCwmServicesComponent;
  let fixture: ComponentFixture<SettingsCwmServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCwmServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCwmServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
