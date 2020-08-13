import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcprimengGenericTableComponent } from './tcprimeng-generic-table.component';

describe('TcprimengGenericTableComponent', () => {
  let component: TcprimengGenericTableComponent;
  let fixture: ComponentFixture<TcprimengGenericTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcprimengGenericTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcprimengGenericTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
