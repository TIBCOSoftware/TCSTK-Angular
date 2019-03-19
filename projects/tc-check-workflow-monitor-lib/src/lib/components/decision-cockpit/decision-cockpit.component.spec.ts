import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionCockpitComponent } from './decision-cockpit.component';

describe('DecisionCockpitComponent', () => {
  let component: DecisionCockpitComponent;
  let fixture: ComponentFixture<DecisionCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
