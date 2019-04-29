import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileToServiceComponent } from './file-to-service.component';

describe('FileToServiceComponent', () => {
  let component: FileToServiceComponent;
  let fixture: ComponentFixture<FileToServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileToServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileToServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
