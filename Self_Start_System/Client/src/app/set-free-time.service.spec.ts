import { TestBed, inject } from '@angular/core/testing';

import { SetFreeTimeService } from './set-free-time.service';

describe('SetFreeTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetFreeTimeService]
    });
  });

  it('should be created', inject([SetFreeTimeService], (service: SetFreeTimeService) => {
    expect(service).toBeTruthy();
  }));
});
