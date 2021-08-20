import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TcprimengGenericTableComponent } from './tcprimeng-generic-table.component';

describe('TcprimengGenericTableComponent', () => {
  let component: TcprimengGenericTableComponent;
  let fixture: ComponentFixture<TcprimengGenericTableComponent>;

  beforeEach(waitForAsync(() => {
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
