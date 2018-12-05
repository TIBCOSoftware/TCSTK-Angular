import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseAuditComponent } from './live-apps-case-audit.component';

describe('LiveAppsCaseAuditComponent', () => {
  let component: LiveAppsCaseAuditComponent;
  let fixture: ComponentFixture<LiveAppsCaseAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
