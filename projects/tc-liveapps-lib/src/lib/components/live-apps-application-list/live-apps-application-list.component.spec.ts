import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsApplicationListComponent } from './live-apps-application-list.component';

describe('LiveAppsApplicationListComponent', () => {
  let component: LiveAppsApplicationListComponent;
  let fixture: ComponentFixture<LiveAppsApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsApplicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
