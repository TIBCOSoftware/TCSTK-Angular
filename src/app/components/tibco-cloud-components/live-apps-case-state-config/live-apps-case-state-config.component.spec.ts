import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseStateConfigComponent } from './live-apps-case-state-config.component';

describe('LiveAppsCaseStateConfigComponent', () => {
  let component: LiveAppsCaseStateConfigComponent;
  let fixture: ComponentFixture<LiveAppsCaseStateConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseStateConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseStateConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
