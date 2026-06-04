import { TestBed } from '@angular/core/testing';

import { PermissionCacheService } from './permission-cache.service';

describe('PermissionCacheService', () => {
  let service: PermissionCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
