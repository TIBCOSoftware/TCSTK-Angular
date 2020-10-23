import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudHelpArchiveComponent } from './tibco-cloud-help-archive.component';

describe('TibcoCloudHelpArchiveComponent', () => {
  let component: TibcoCloudHelpArchiveComponent;
  let fixture: ComponentFixture<TibcoCloudHelpArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TibcoCloudHelpArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudHelpArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
