import { TestBed } from '@angular/core/testing';

import { RouteProtectionService } from './route-protection.service';

describe('RouteProtectionService', () => {
  let service: RouteProtectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteProtectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
