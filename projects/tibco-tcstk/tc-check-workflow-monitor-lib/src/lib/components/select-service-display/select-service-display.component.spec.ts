import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectServiceDisplayComponent } from './select-service-display.component';

describe('SelectServiceDisplayComponent', () => {
  let component: SelectServiceDisplayComponent;
  let fixture: ComponentFixture<SelectServiceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectServiceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectServiceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
