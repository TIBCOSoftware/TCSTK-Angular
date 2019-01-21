import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsStateIconComponent } from './live-apps-state-icon.component';

describe('LiveAppsStateIconComponent', () => {
  let component: LiveAppsStateIconComponent;
  let fixture: ComponentFixture<LiveAppsStateIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsStateIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsStateIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
