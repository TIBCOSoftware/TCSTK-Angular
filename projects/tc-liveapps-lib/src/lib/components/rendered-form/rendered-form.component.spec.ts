import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderedFormComponent } from './rendered-form.component';

describe('RenderedFormComponent', () => {
  let component: RenderedFormComponent;
  let fixture: ComponentFixture<RenderedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
