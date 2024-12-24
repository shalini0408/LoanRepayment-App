import { TestBed } from '@angular/core/testing';

import { AdvancepaymentServiceService } from './advancepayment-service.service';

describe('AdvancepaymentServiceService', () => {
  let service: AdvancepaymentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancepaymentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
