import { TestBed, inject } from '@angular/core/testing';

import { RehabilitationPlanService } from './rehabilitation-plan.service';

describe('RehabilitationPlanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RehabilitationPlanService]
    });
  });

  it('should be created', inject([RehabilitationPlanService], (service: RehabilitationPlanService) => {
    expect(service).toBeTruthy();
  }));
});
