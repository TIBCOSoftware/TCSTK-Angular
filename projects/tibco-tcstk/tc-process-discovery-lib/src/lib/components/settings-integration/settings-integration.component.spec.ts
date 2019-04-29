import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIntegrationComponent } from './settings-integration.component';

describe('SettingsIntegrationComponent', () => {
  let component: SettingsIntegrationComponent;
  let fixture: ComponentFixture<SettingsIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
