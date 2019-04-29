import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCaseToCsvComponent } from './export-case-to-csv.component';

describe('ExportCaseToCsvComponent', () => {
  let component: ExportCaseToCsvComponent;
  let fixture: ComponentFixture<ExportCaseToCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportCaseToCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportCaseToCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
