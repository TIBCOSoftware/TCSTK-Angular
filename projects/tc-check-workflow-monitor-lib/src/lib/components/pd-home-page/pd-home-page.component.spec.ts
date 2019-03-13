import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdHomePageComponent } from './pd-home-page.component';

describe('PdHomePageComponent', () => {
  let component: PdHomePageComponent;
  let fixture: ComponentFixture<PdHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
