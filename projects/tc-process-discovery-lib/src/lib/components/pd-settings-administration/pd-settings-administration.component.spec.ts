import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdSettingsAdministrationComponent } from './pd-settings-administration.component';

describe('PdSettingsAdministrationComponent', () => {
  let component: PdSettingsAdministrationComponent;
  let fixture: ComponentFixture<PdSettingsAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdSettingsAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdSettingsAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
