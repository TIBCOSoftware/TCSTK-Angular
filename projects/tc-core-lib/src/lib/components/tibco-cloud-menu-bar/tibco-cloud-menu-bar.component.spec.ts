import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudMenuBarComponent } from './tibco-cloud-menu-bar.component';

describe('TibcoCloudMenuBarComponent', () => {
  let component: TibcoCloudMenuBarComponent;
  let fixture: ComponentFixture<TibcoCloudMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TibcoCloudMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
