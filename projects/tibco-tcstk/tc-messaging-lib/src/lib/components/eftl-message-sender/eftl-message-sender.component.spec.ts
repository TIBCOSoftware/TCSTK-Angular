import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EftlMessageSenderComponent } from './eftl-message-sender.component';

describe('EftlMessageSenderComponent', () => {
  let component: EftlMessageSenderComponent;
  let fixture: ComponentFixture<EftlMessageSenderComponent>;

  beforeEach(async(() => {
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
