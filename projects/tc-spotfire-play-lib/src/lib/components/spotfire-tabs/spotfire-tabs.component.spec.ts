import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotfireTabsComponent } from './spotfire-tabs.component';

describe('SpotfireTabsComponent', () => {
  let component: SpotfireTabsComponent;
  let fixture: ComponentFixture<SpotfireTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotfireTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotfireTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
