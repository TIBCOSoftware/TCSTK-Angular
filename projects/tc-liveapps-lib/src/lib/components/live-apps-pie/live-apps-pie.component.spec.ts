import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsPieComponent } from './live-apps-pie.component';

describe('LiveAppsPieComponent', () => {
  let component: LiveAppsPieComponent;
  let fixture: ComponentFixture<LiveAppsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
