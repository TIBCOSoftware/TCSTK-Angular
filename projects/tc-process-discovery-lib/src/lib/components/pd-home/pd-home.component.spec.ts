import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdHomeComponent } from './pd-home.component';

describe('PdHomeComponent', () => {
  let component: PdHomeComponent;
  let fixture: ComponentFixture<PdHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
