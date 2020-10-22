import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudVideoComponent } from './tibco-cloud-video.component';

describe('TibcoCloudVideoComponent', () => {
  let component: TibcoCloudVideoComponent;
  let fixture: ComponentFixture<TibcoCloudVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TibcoCloudVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
