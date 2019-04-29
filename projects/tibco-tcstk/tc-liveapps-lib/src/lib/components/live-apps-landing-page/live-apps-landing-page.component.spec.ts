import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsLandingPageComponent } from './live-apps-landing-page.component';

describe('LandingPageComponent', () => {
    let component: LiveAppsLandingPageComponent;
    let fixture: ComponentFixture<LiveAppsLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [LiveAppsLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(LiveAppsLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
