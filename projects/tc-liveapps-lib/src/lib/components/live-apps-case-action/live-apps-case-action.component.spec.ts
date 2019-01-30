import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseActionComponent } from './live-apps-case-action.component';

describe('LiveAppsCaseActionComponent', () => {
  let component: LiveAppsCaseActionComponent;
  let fixture: ComponentFixture<LiveAppsCaseActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
