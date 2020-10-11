import { TestBed } from '@angular/core/testing';

import { ShopselectService } from './shopselect.service';

describe('ShopselectService', () => {
  let service: ShopselectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopselectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
