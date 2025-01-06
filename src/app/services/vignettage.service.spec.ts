import { TestBed } from '@angular/core/testing';

import { VignettageService } from './vignettage.service';

describe('VignettageService', () => {
  let service: VignettageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VignettageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
