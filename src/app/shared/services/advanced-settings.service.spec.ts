import { TestBed } from '@angular/core/testing';

import { AdvancedSettingsService } from './advanced-settings.service';

describe('AdvancedSettingsService', () => {
  let service: AdvancedSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancedSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
