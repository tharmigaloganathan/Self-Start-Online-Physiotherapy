import { TestBed, inject } from '@angular/core/testing';

import { ManagePatientProfileService } from './manage-patient-profile.service';

describe('ManagePatientProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagePatientProfileService]
    });
  });

  it('should be created', inject([ManagePatientProfileService], (service: ManagePatientProfileService) => {
    expect(service).toBeTruthy();
  }));
});
