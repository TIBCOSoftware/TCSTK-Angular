import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudSettingLandingComponent } from './tibco-cloud-setting-landing.component';

describe('TibcoCloudSettingLandingComponent', () => {
  let component: TibcoCloudSettingLandingComponent;
  let fixture: ComponentFixture<TibcoCloudSettingLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TibcoCloudSettingLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudSettingLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
