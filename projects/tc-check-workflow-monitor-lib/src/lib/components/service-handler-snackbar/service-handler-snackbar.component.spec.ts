import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHandlerSnackbarComponent } from './service-handler-snackbar.component';

describe('ServiceHandlerSnackbarComponent', () => {
  let component: ServiceHandlerSnackbarComponent;
  let fixture: ComponentFixture<ServiceHandlerSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceHandlerSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHandlerSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
