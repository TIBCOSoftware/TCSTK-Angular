import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCockpitComponent } from './home-cockpit.component';

describe('HomeCockpitComponent', () => {
  let component: HomeCockpitComponent;
  let fixture: ComponentFixture<HomeCockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
