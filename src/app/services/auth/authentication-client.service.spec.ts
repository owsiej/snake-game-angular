import { TestBed } from '@angular/core/testing';

import { AuthenticationClientService } from './authentication-client.service';

describe('AuthenticationClientService', () => {
  let service: AuthenticationClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
