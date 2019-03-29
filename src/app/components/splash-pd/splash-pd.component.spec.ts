import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashPDComponent } from './splash-pd.component';

describe('SplashPDComponent', () => {
  let component: SplashPDComponent;
  let fixture: ComponentFixture<SplashPDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashPDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashPDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
