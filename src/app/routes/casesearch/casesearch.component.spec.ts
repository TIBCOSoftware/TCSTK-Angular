import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CasesearchComponent} from './casesearch.component';

describe('CasesearchComponent', () => {
  let component: CasesearchComponent;
  let fixture: ComponentFixture<CasesearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
