import { TestBed, inject } from '@angular/core/testing';

import { UserAccountListService } from './user-account-list.service';

describe('UserAccountListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAccountListService]
    });
  });

  it('should be created', inject([UserAccountListService], (service: UserAccountListService) => {
    expect(service).toBeTruthy();
  }));
});
