import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudWidgetHeaderComponent } from './tibco-cloud-widget-header.component';

describe('TcWidgetHeaderComponent', () => {
  let component: TibcoCloudWidgetHeaderComponent;
  let fixture: ComponentFixture<TibcoCloudWidgetHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TibcoCloudWidgetHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudWidgetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
