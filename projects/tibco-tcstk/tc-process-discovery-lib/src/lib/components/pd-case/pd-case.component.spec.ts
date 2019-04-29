import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdCaseComponent } from './pd-case.component';

describe('PdCaseComponent', () => {
  let component: PdCaseComponent;
  let fixture: ComponentFixture<PdCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
