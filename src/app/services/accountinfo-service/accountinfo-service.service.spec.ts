import { TestBed } from '@angular/core/testing';

import { AccountinfoServiceService } from './accountinfo-service.service';

describe('AccountinfoServiceService', () => {
  let service: AccountinfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountinfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
