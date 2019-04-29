import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudSelectTableComponent } from './tibco-cloud-select-table.component';

describe('TibcoCloudSelectTableComponent', () => {
  let component: TibcoCloudSelectTableComponent;
  let fixture: ComponentFixture<TibcoCloudSelectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TibcoCloudSelectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudSelectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
