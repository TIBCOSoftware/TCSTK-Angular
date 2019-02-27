import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCockpitComponent } from './case-cockpit.component';

describe('CaseCockpitComponent', () => {
  let component: CaseCockpitComponent;
  let fixture: ComponentFixture<CaseCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
