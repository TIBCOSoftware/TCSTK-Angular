import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EftlMessageSenderComponent } from './eftl-message-sender.component';

describe('EftlMessageSenderComponent', () => {
  let component: EftlMessageSenderComponent;
  let fixture: ComponentFixture<EftlMessageSenderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EftlMessageSenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EftlMessageSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
