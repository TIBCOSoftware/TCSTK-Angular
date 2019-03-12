import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsLiveappsComponent } from './settings-liveapps.component';

describe('SettingsLiveappsComponent', () => {
  let component: SettingsLiveappsComponent;
  let fixture: ComponentFixture<SettingsLiveappsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLiveappsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLiveappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
