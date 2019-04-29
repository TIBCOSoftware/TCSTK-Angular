import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudConfigurationComponent } from './tibco-cloud-configuration.component';

describe('TibcoCloudConfigurationComponent', () => {
  let component: TibcoCloudConfigurationComponent;
  let fixture: ComponentFixture<TibcoCloudConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TibcoCloudConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
