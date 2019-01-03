import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseListComponent } from './live-apps-case-list.component';

describe('LiveAppsCaseListComponent', () => {
  let component: LiveAppsCaseListComponent;
  let fixture: ComponentFixture<LiveAppsCaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
