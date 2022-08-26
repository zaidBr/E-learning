import { TestBed } from '@angular/core/testing';

import { CoursEditResolverService } from './cours-edit-resolver.service';

describe('CoursEditResolverService', () => {
  let service: CoursEditResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursEditResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
