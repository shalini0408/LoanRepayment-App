import { TestBed } from '@angular/core/testing';

import { LoaninfoServiceService } from './loaninfo-service.service';

describe('LoaninfoServiceService', () => {
  let service: LoaninfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaninfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
