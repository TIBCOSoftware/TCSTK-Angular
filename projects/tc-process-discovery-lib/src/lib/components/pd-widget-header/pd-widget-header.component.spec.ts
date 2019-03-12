import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdWidgetHeaderComponent } from './pd-widget-header.component';

describe('PdHeaderComponent', () => {
  let component: PdWidgetHeaderComponent;
  let fixture: ComponentFixture<PdWidgetHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdWidgetHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdWidgetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
