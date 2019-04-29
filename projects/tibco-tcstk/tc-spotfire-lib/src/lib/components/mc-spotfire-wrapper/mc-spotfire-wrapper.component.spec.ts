import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McSpotfireWrapperComponent } from './mc-spotfire-wrapper.component';

describe('McSpotfireWrapperComponent', () => {
  let component: McSpotfireWrapperComponent;
  let fixture: ComponentFixture<McSpotfireWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McSpotfireWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McSpotfireWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
