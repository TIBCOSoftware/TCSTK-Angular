import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotfirePlayComponent } from './spotfire-play.component';

describe('SpotfirePlayComponent', () => {
  let component: SpotfirePlayComponent;
  let fixture: ComponentFixture<SpotfirePlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotfirePlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotfirePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
