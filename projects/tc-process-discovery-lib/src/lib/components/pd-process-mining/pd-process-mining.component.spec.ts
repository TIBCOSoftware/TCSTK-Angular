import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdProcessMiningComponent } from './pd-process-mining.component';

describe('PdProcessMiningComponent', () => {
  let component: PdProcessMiningComponent;
  let fixture: ComponentFixture<PdProcessMiningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdProcessMiningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdProcessMiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
