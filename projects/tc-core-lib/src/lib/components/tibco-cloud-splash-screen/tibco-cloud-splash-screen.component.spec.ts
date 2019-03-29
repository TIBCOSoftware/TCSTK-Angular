import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudSplashScreenComponent } from './tibco-cloud-splash-screen.component';

describe('TibcoCloudSplashScreenComponent', () => {
  let component: TibcoCloudSplashScreenComponent;
  let fixture: ComponentFixture<TibcoCloudSplashScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TibcoCloudSplashScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudSplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
