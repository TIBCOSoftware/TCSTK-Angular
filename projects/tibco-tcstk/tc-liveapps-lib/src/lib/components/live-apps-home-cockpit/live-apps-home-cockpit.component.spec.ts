import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsHomeCockpitComponent } from './live-apps-home-cockpit.component';

describe('LiveAppsHomeCockpitComponent', () => {
  let component: LiveAppsHomeCockpitComponent;
  let fixture: ComponentFixture<LiveAppsHomeCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsHomeCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsHomeCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
