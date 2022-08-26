import { TestBed } from '@angular/core/testing';

import { CategorieEditResolverService } from './categorie-edit-resolver.service';

describe('CategorieEditResolverService', () => {
  let service: CategorieEditResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieEditResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
