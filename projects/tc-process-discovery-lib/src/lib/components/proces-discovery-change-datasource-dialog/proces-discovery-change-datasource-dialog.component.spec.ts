import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesDiscoveryChangeDatasourceDialogComponent } from './proces-discovery-change-datasource-dialog.component';

describe('ProcesDiscoveryChangeDatasourceDialogComponent', () => {
  let component: ProcesDiscoveryChangeDatasourceDialogComponent;
  let fixture: ComponentFixture<ProcesDiscoveryChangeDatasourceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesDiscoveryChangeDatasourceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesDiscoveryChangeDatasourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
