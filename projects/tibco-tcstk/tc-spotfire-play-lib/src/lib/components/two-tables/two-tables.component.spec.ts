import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoTablesComponent } from './two-tables.component';

describe('TwoTablesComponent', () => {
  let component: TwoTablesComponent;
  let fixture: ComponentFixture<TwoTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
