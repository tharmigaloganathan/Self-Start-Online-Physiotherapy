import { TestBed, inject } from '@angular/core/testing';

import { CreateUserAccountService } from './create-user-account.service';

describe('CreateUserAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateUserAccountService]
    });
  });

  it('should be created', inject([CreateUserAccountService], (service: CreateUserAccountService) => {
    expect(service).toBeTruthy();
  }));
});
