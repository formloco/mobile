import { TestBed } from '@angular/core/testing';

import { TransformRunService } from './transform-run.service';

describe('TransformRunService', () => {
  let service: TransformRunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformRunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
