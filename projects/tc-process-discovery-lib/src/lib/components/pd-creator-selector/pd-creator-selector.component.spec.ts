import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdCreatorSelectorComponent } from './pd-creator-selector.component';

describe('PdCreatorSelectorComponent', () => {
  let component: PdCreatorSelectorComponent;
  let fixture: ComponentFixture<PdCreatorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdCreatorSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdCreatorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
