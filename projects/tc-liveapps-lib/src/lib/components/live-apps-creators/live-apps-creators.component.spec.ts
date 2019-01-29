import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCreatorsComponent } from './live-apps-creators.component';

describe('LiveAppsCreatorsComponent', () => {
  let component: LiveAppsCreatorsComponent;
  let fixture: ComponentFixture<LiveAppsCreatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCreatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
