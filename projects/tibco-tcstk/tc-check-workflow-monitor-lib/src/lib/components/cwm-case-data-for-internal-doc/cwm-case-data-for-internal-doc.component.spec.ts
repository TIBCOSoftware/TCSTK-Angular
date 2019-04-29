import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwmCaseDataForInternalDocComponent } from './cwm-case-data-for-internal-doc.component';

describe('CwmCaseDataForInternalDocComponent', () => {
  let component: CwmCaseDataForInternalDocComponent;
  let fixture: ComponentFixture<CwmCaseDataForInternalDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwmCaseDataForInternalDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwmCaseDataForInternalDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
