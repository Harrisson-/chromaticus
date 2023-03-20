import { TestBed } from '@angular/core/testing';

import { ColorFormatCastService } from './color-format-cast.service';

describe('ColorFormatCastService', () => {
  let service: ColorFormatCastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorFormatCastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
