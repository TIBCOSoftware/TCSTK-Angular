import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseCreatorsComponent } from './live-apps-case-creators.component';

describe('LiveAppsCaseCreatorsComponent', () => {
  let component: LiveAppsCaseCreatorsComponent;
  let fixture: ComponentFixture<LiveAppsCaseCreatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseCreatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseCreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
