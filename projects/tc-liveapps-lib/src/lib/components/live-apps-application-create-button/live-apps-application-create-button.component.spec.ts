import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsApplicationCreateButtonComponent } from './live-apps-application-create-button.component';

describe('LiveAppsApplicationCreateButtonComponent', () => {
  let component: LiveAppsApplicationCreateButtonComponent;
  let fixture: ComponentFixture<LiveAppsApplicationCreateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsApplicationCreateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsApplicationCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
