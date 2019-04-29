import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseCreatorComponent } from './live-apps-case-creator.component';

describe('LiveAppsCaseCreatorComponent', () => {
  let component: LiveAppsCaseCreatorComponent;
  let fixture: ComponentFixture<LiveAppsCaseCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
