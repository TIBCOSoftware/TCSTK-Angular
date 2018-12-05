import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsRecentCasesComponent } from './live-apps-recent-cases.component';

describe('LiveAppsRecentCasesComponent', () => {
  let component: LiveAppsRecentCasesComponent;
  let fixture: ComponentFixture<LiveAppsRecentCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsRecentCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsRecentCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
