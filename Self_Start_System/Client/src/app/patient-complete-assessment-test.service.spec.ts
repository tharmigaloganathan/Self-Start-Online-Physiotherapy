import { TestBed, inject } from '@angular/core/testing';

import { PatientCompleteAssessmentTestService } from './patient-complete-assessment-test.service';

describe('PatientCompleteAssessmentTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientCompleteAssessmentTestService]
    });
  });

  it('should be created', inject([PatientCompleteAssessmentTestService], (service: PatientCompleteAssessmentTestService) => {
    expect(service).toBeTruthy();
  }));
});
