import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudNewElementComponent } from './tibco-cloud-new-element.component';

describe('TibcoCloudNewElementComponent', () => {
  let component: TibcoCloudNewElementComponent;
  let fixture: ComponentFixture<TibcoCloudNewElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TibcoCloudNewElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudNewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
