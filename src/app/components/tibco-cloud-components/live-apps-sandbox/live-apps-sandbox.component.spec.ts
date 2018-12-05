import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsSandboxComponent } from './live-apps-sandbox.component';

describe('CreatorFormComponent', () => {
  let component: LiveAppsSandboxComponent;
  let fixture: ComponentFixture<LiveAppsSandboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsSandboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
