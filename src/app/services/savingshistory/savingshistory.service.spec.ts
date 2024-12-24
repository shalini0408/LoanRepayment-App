import { TestBed } from '@angular/core/testing';

import { SavingshistoryService } from './savingshistory.service';

describe('SavingshistoryService', () => {
  let service: SavingshistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingshistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
