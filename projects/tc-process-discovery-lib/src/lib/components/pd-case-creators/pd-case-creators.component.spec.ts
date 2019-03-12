import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdCaseCreatorsComponent } from './pd-case-creators.component';

describe('PdCaseCreatorsComponent', () => {
  let component: PdCaseCreatorsComponent;
  let fixture: ComponentFixture<PdCaseCreatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdCaseCreatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdCaseCreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
