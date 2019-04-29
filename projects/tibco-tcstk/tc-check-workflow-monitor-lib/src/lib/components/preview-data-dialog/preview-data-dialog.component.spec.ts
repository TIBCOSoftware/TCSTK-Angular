import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewDataDialogComponent } from './preview-data-dialog.component';

describe('PreviewDataDialogComponent', () => {
  let component: PreviewDataDialogComponent;
  let fixture: ComponentFixture<PreviewDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
