import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseActionsListComponent } from './live-apps-case-actions-list.component';

describe('LiveAppsCaseActionsListComponent', () => {
  let component: LiveAppsCaseActionsListComponent;
  let fixture: ComponentFixture<LiveAppsCaseActionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseActionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
