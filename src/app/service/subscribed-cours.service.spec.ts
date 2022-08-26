import { TestBed } from '@angular/core/testing';

import { SubscribedCoursService } from './subscribed-cours.service';

describe('SubscribedCoursService', () => {
  let service: SubscribedCoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribedCoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
