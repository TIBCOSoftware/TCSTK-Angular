import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsCaseSearchComponent } from './live-apps-case-search.component';

describe('LiveAppsCaseSearchComponent', () => {
  let component: LiveAppsCaseSearchComponent;
  let fixture: ComponentFixture<LiveAppsCaseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsCaseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsCaseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
