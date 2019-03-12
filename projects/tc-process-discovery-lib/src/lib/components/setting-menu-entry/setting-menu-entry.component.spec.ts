import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingMenuEntryComponent } from './setting-menu-entry.component';

describe('SettingMenuEntryComponent', () => {
  let component: SettingMenuEntryComponent;
  let fixture: ComponentFixture<SettingMenuEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingMenuEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingMenuEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
