import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseDataComponent } from './live-apps-case-data.component';

describe('LiveAppsCaseDataComponent', () => {
  let component: LiveAppsCaseDataComponent;
  let fixture: ComponentFixture<LiveAppsCaseDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
