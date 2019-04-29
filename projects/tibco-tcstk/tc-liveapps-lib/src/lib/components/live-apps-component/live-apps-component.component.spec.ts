import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsComponentComponent } from './live-apps-component.component';

describe('LiveAppsComponentComponent', () => {
  let component: LiveAppsComponentComponent;
  let fixture: ComponentFixture<LiveAppsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
