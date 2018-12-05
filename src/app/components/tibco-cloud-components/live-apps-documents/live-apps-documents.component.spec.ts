import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsDocumentsComponent } from './live-apps-documents.component';

describe('LiveAppsDocumentsComponent', () => {
  let component: LiveAppsDocumentsComponent;
  let fixture: ComponentFixture<LiveAppsDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
