import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdNewDatasourceComponent } from './pd-new-datasource.component';

describe('PdNewDatasourceComponent', () => {
  let component: PdNewDatasourceComponent;
  let fixture: ComponentFixture<PdNewDatasourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdNewDatasourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdNewDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
