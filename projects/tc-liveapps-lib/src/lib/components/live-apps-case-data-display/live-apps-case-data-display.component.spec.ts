import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseDataDisplayComponent } from './live-apps-case-data-display.component';

describe('LiveAppsCaseDataDisplayComponent', () => {
  let component: LiveAppsCaseDataDisplayComponent;
  let fixture: ComponentFixture<LiveAppsCaseDataDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseDataDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
