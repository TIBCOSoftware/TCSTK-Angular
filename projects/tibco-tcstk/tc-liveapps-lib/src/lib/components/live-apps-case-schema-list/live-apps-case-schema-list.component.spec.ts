import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseSchemaListComponent } from './live-apps-case-schema-list.component';

describe('LiveAppsCaseCreatorListComponent', () => {
  let component: LiveAppsCaseSchemaListComponent;
  let fixture: ComponentFixture<LiveAppsCaseSchemaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseSchemaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseSchemaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
