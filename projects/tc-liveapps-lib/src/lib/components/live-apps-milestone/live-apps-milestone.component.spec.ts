import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsMilestoneComponent } from './live-apps-milestone.component';

describe('LiveAppsMilestoneComponent', () => {
  let component: LiveAppsMilestoneComponent;
  let fixture: ComponentFixture<LiveAppsMilestoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsMilestoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
