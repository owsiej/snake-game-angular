import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { SubmitGuard } from './submit.guard';

describe('SubmitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => SubmitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
