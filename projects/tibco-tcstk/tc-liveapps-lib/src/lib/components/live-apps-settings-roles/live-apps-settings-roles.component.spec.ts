import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsSettingsRolesComponent } from './live-apps-settings-roles.component';

describe('LiveAppsSettingsRolesComponent', () => {
  let component: LiveAppsSettingsRolesComponent;
  let fixture: ComponentFixture<LiveAppsSettingsRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsSettingsRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsSettingsRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
