import { TestBed, async, inject } from '@angular/core/testing';

import { PhysioGuard } from './physio.guard';

describe('PhysioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhysioGuard]
    });
  });

  it('should ...', inject([PhysioGuard], (guard: PhysioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
