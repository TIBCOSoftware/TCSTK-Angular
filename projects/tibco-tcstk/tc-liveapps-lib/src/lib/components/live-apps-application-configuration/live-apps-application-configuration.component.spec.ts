import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsApplicationConfigurationComponent } from './live-apps-application-configuration.component';

describe('LiveAppsApplicationConfigurationComponent', () => {
  let component: LiveAppsApplicationConfigurationComponent;
  let fixture: ComponentFixture<LiveAppsApplicationConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsApplicationConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsApplicationConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
