import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPlanListComponent } from './patient-plan-list.component';

describe('PatientPlanListComponent', () => {
  let component: PatientPlanListComponent;
  let fixture: ComponentFixture<PatientPlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPlanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
