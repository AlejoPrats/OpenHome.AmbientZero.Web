import { TestBed } from '@angular/core/testing';

import { AdditionalPageInformationService } from './additional-page-information.service';

describe('AdditionalPageInformationService', () => {
  let service: AdditionalPageInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalPageInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
