import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSelectComponent } from './table-select.component';

describe('TableSelectComponent', () => {
  let component: TableSelectComponent;
  let fixture: ComponentFixture<TableSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
