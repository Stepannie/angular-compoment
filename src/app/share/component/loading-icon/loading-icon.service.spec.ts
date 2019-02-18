import { TestBed } from '@angular/core/testing';

import { LoadingIconService } from './loading-icon.service';

describe('LoadingIconService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingIconService = TestBed.get(LoadingIconService);
    expect(service).toBeTruthy();
  });
});
