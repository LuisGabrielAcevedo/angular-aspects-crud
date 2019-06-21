import { TestBed, async, inject } from '@angular/core/testing';

import { QueryParamsGuard } from './query-params.guard';

describe('QueryParamsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryParamsGuard]
    });
  });

  it('should ...', inject([QueryParamsGuard], (guard: QueryParamsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
