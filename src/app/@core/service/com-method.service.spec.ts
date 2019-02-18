import { TestBed } from '@angular/core/testing';

import { ComMethodService } from './com-method.service';

describe('ComMethodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComMethodService = TestBed.get(ComMethodService);
    expect(service).toBeTruthy();
  });
});
