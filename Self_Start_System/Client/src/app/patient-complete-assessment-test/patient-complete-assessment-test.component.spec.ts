import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCompleteAssessmentTestComponent } from './patient-complete-assessment-test.component';

describe('PatientCompleteAssessmentTestComponent', () => {
  let component: PatientCompleteAssessmentTestComponent;
  let fixture: ComponentFixture<PatientCompleteAssessmentTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientCompleteAssessmentTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientCompleteAssessmentTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
