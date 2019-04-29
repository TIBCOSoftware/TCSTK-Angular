import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TibcoCloudErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: TibcoCloudErrorComponent;
  let fixture: ComponentFixture<TibcoCloudErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TibcoCloudErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TibcoCloudErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
