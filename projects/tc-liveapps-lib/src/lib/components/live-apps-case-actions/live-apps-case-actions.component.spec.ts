import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseActionsComponent } from './live-apps-case-actions.component';

describe('LiveAppsCaseActionsComponent', () => {
  let component: LiveAppsCaseActionsComponent;
  let fixture: ComponentFixture<LiveAppsCaseActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
