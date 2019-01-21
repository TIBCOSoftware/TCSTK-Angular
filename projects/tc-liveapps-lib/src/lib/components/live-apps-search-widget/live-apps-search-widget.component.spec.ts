import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsSearchWidgetComponent } from './live-apps-search-widget.component';

describe('LiveAppsSearchWidgetComponent', () => {
  let component: LiveAppsSearchWidgetComponent;
  let fixture: ComponentFixture<LiveAppsSearchWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsSearchWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsSearchWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
