import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdSettingsConfigurationComponent } from './pd-settings-configuration.component';

describe('PdSettingsConfigurationComponent', () => {
  let component: PdSettingsConfigurationComponent;
  let fixture: ComponentFixture<PdSettingsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdSettingsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdSettingsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
