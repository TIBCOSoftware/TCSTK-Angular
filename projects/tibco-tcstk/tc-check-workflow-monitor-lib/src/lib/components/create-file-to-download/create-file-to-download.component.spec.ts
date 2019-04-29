import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFileToDownloadComponent } from './create-file-to-download.component';

describe('CreateFileToDownloadComponent', () => {
  let component: CreateFileToDownloadComponent;
  let fixture: ComponentFixture<CreateFileToDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFileToDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFileToDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
