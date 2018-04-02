import { TestBed, inject } from '@angular/core/testing';

import { GetProfileResolveService } from './get-profile-resolve.service';

describe('GetProfileResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetProfileResolveService]
    });
  });

  it('should be created', inject([GetProfileResolveService], (service: GetProfileResolveService) => {
    expect(service).toBeTruthy();
  }));
});
