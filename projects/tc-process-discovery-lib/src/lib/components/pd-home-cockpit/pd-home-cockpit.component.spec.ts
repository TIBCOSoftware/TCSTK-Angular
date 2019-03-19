import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdHomeCockpitComponent } from './pd-home-cockpit.component';

describe('PdHomeCockpitComponent', () => {
  let component: PdHomeCockpitComponent;
  let fixture: ComponentFixture<PdHomeCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdHomeCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdHomeCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
