import { TestBed } from '@angular/core/testing';

import { ScoresClientService } from './scores-client.service';

describe('HighscoresService', () => {
  let service: ScoresClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoresClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
