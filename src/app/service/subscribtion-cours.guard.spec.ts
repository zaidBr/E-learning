import { TestBed } from '@angular/core/testing';

import { SubscribtionCoursGuard } from './subscribtion-cours.guard';

describe('SubscribtionCoursGuard', () => {
  let guard: SubscribtionCoursGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SubscribtionCoursGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
