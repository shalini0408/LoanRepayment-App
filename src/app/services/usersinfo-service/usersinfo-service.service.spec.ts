import { TestBed } from '@angular/core/testing';

import { UsersinfoServiceService } from './usersinfo-service.service';

describe('UsersinfoServiceService', () => {
  let service: UsersinfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersinfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
