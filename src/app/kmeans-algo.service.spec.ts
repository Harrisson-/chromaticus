import { TestBed } from '@angular/core/testing';

import { KmeansAlgoService } from './kmeans-algo.service';

describe('KmeansAlgoService', () => {
  let service: KmeansAlgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KmeansAlgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
