import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseCreatorWidgetComponent } from './live-apps-case-creator-widget.component';

describe('LiveAppsCaseCreatorWidgetComponent', () => {
  let component: LiveAppsCaseCreatorWidgetComponent;
  let fixture: ComponentFixture<LiveAppsCaseCreatorWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseCreatorWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseCreatorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
