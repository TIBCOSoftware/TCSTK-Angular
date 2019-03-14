import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudSettingMenuEntryComponent } from './tibco-cloud-setting-menu-entry.component';

describe('TibcoCloudSettingMenuEntryComponent', () => {
  let component: TibcoCloudSettingMenuEntryComponent;
  let fixture: ComponentFixture<TibcoCloudSettingMenuEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TibcoCloudSettingMenuEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudSettingMenuEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
