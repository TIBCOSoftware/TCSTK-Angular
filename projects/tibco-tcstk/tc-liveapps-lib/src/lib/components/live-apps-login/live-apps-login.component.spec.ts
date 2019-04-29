import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsLoginComponent } from './live-apps-login.component';

describe('LiveAppsLoginComponent', () => {
  let component: LiveAppsLoginComponent;
  let fixture: ComponentFixture<LiveAppsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
