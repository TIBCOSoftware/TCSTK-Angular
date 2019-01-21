import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseStatesComponent } from './live-apps-case-states.component';

describe('LiveAppsCaseStatesComponent', () => {
  let component: LiveAppsCaseStatesComponent;
  let fixture: ComponentFixture<LiveAppsCaseStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
