import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSpotfireComponent } from './settings-spotfire.component';

describe('SettingsSpotfireComponent', () => {
  let component: SettingsSpotfireComponent;
  let fixture: ComponentFixture<SettingsSpotfireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsSpotfireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSpotfireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
