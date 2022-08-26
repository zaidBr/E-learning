import { TestBed } from '@angular/core/testing';

import { AllCourseResolverService } from './all-course-resolver.service';

describe('AllCourseResolverService', () => {
  let service: AllCourseResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCourseResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
