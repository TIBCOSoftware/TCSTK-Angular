import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsFormWcComponent } from './live-apps-form-wc.component';

describe('LiveAppsFormWcComponent', () => {
  let component: LiveAppsFormWcComponent;
  let fixture: ComponentFixture<LiveAppsFormWcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsFormWcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsFormWcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
