import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudSettingsGeneralComponent } from './tibco-cloud-settings-general.component';

describe('SettingsGeneralComponent', () => {
  let component: TibcoCloudSettingsGeneralComponent;
  let fixture: ComponentFixture<TibcoCloudSettingsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TibcoCloudSettingsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudSettingsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
