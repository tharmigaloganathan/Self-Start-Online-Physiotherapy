import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientPlanListComponent } from './edit-patient-plan-list.component';

describe('EditPatientPlanListComponent', () => {
  let component: EditPatientPlanListComponent;
  let fixture: ComponentFixture<EditPatientPlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPatientPlanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
