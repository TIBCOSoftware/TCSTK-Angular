import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcHandsontableComponent } from './tc-handsontable.component';

describe('TcHandsontableComponent', () => {
  let component: TcHandsontableComponent;
  let fixture: ComponentFixture<TcHandsontableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcHandsontableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcHandsontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
