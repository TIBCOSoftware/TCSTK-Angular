import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsRoleSwitcherComponent } from './live-apps-role-switcher.component';

describe('LiveAppsRoleSwitcherComponent', () => {
  let component: LiveAppsRoleSwitcherComponent;
  let fixture: ComponentFixture<LiveAppsRoleSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsRoleSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsRoleSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
