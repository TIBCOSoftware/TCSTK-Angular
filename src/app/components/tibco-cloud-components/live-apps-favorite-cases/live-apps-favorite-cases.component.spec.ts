import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveAppsFavoriteCasesComponent } from './live-apps-favorite-cases.component';

describe('LiveAppsFavoriteCasesComponent', () => {
  let component: LiveAppsFavoriteCasesComponent;
  let fixture: ComponentFixture<LiveAppsFavoriteCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveAppsFavoriteCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveAppsFavoriteCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
