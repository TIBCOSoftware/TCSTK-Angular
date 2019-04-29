import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleListForSelectionComponent } from './double-list-for-selection.component';

describe('DoubleListForSelectionComponent', () => {
  let component: DoubleListForSelectionComponent;
  let fixture: ComponentFixture<DoubleListForSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleListForSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleListForSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
