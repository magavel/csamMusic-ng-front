import { TestBed } from '@angular/core/testing';

import { TonaliteService } from './tonalite.service';

describe('TonaliteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TonaliteService = TestBed.get(TonaliteService);
    expect(service).toBeTruthy();
  });
});
