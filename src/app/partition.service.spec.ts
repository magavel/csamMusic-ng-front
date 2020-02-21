import { TestBed } from '@angular/core/testing';

import { PartitionService } from './partition.service';

describe('PartitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartitionService = TestBed.get(PartitionService);
    expect(service).toBeTruthy();
  });
});
