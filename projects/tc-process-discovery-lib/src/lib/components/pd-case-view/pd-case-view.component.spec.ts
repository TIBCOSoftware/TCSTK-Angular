import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdCaseViewComponent } from './pd-case-view.component';

describe('PdCaseViewComponent', () => {
  let component: PdCaseViewComponent;
  let fixture: ComponentFixture<PdCaseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdCaseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdCaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
