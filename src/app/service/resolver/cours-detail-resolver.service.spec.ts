import { TestBed } from '@angular/core/testing';

import { CoursDetailResolverService } from './cours-detail-resolver.service';

describe('CoursDetailResolverService', () => {
  let service: CoursDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
