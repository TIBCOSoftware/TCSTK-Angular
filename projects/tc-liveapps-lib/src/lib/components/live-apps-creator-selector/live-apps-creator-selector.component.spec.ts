import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCreatorSelectorComponent } from './live-apps-creator-selector.component';

describe('LiveAppsCreatorSelectorComponent', () => {
  let component: LiveAppsCreatorSelectorComponent;
  let fixture: ComponentFixture<LiveAppsCreatorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCreatorSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCreatorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
