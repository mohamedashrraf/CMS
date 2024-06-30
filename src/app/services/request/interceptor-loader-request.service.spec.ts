import { TestBed } from '@angular/core/testing';

import { InterceptorLoaderRequestService } from './interceptor-loader-request.service';

describe('InterceptorLoaderRequestService', () => {
  let service: InterceptorLoaderRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorLoaderRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
