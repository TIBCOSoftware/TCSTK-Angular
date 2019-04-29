import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsDocumentViewerComponent } from './live-apps-document-viewer.component';

describe('LiveAppsDocumentViewerComponent', () => {
  let component: LiveAppsDocumentViewerComponent;
  let fixture: ComponentFixture<LiveAppsDocumentViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsDocumentViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsDocumentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
