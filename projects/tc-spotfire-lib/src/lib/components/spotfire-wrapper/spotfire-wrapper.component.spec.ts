import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotfireWrapperComponent } from './spotfire-wrapper.component';

describe('SpotfireWrapperComponent', () => {
  let component: SpotfireWrapperComponent;
  let fixture: ComponentFixture<SpotfireWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotfireWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotfireWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
