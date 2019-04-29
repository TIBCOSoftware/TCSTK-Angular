import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseStateAuditComponent } from './live-apps-case-state-audit.component';

describe('LiveAppsCaseStateAuditComponent', () => {
  let component: LiveAppsCaseStateAuditComponent;
  let fixture: ComponentFixture<LiveAppsCaseStateAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseStateAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseStateAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
