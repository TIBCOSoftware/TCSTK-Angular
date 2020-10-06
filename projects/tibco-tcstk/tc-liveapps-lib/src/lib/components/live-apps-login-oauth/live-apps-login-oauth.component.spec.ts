import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsLoginOauthComponent } from './live-apps-login-oauth.component';

describe('LiveAppsLoginOauthComponent', () => {
  let component: LiveAppsLoginOauthComponent;
  let fixture: ComponentFixture<LiveAppsLoginOauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveAppsLoginOauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsLoginOauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
