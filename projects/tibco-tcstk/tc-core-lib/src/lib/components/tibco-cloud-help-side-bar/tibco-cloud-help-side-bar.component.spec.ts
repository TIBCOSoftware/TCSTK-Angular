import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudHelpSideBarComponent } from './tibco-cloud-help-side-bar.component';

describe('TibcoCloudHelpSideBarComponent', () => {
  let component: TibcoCloudHelpSideBarComponent;
  let fixture: ComponentFixture<TibcoCloudHelpSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TibcoCloudHelpSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudHelpSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
