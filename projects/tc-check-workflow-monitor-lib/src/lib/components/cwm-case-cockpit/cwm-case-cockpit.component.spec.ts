import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwmCaseCockpitComponent } from './cwm-case-cockpit.component';

describe('CwmCaseCockpitComponent', () => {
  let component: CwmCaseCockpitComponent;
  let fixture: ComponentFixture<CwmCaseCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwmCaseCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwmCaseCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
