import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudVideoCarouselComponent } from './tibco-cloud-video-carousel.component';

describe('TibcoCloudVideoCarouselComponent', () => {
  let component: TibcoCloudVideoCarouselComponent;
  let fixture: ComponentFixture<TibcoCloudVideoCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TibcoCloudVideoCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudVideoCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
