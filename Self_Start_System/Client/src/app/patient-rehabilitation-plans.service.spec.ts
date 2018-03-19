import { TestBed, inject } from '@angular/core/testing';

import { PatientRehabilitationPlansService } from './patient-rehabilitation-plans.service';

describe('PatientRehabilitationPlansService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientRehabilitationPlansService]
    });
  });

  it('should be created', inject([PatientRehabilitationPlansService], (service: PatientRehabilitationPlansService) => {
    expect(service).toBeTruthy();
  }));
});
