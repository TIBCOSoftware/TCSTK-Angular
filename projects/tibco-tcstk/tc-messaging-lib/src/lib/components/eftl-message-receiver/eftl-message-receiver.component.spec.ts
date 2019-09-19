import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EftlMessageReceiverComponent } from './eftl-message-receiver.component';

describe('EftlMessageReceiverComponent', () => {
  let component: EftlMessageReceiverComponent;
  let fixture: ComponentFixture<EftlMessageReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EftlMessageReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EftlMessageReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
