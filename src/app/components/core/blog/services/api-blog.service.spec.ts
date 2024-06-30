import { TestBed } from '@angular/core/testing';

import { ApiBlogService } from './api-blog.service';

describe('ApiBlogService', () => {
  let service: ApiBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
