import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseCockpitComponent } from './live-apps-case-cockpit.component';

describe('LiveAppsCaseCockpitComponent', () => {
  let component: LiveAppsCaseCockpitComponent;
  let fixture: ComponentFixture<LiveAppsCaseCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
