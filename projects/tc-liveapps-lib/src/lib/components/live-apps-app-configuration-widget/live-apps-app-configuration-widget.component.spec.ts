import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsAppConfigurationWidgetComponent } from './live-apps-app-configuration-widget.component';

describe('LiveAppsAppConfigurationWidgetComponent', () => {
  let component: LiveAppsAppConfigurationWidgetComponent;
  let fixture: ComponentFixture<LiveAppsAppConfigurationWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsAppConfigurationWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsAppConfigurationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
