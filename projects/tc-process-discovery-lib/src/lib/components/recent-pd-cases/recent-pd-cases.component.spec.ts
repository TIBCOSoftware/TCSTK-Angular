import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPdCasesComponent } from './recent-pd-cases.component';

describe('RecentPdCasesComponent', () => {
  let component: RecentPdCasesComponent;
  let fixture: ComponentFixture<RecentPdCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentPdCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPdCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
