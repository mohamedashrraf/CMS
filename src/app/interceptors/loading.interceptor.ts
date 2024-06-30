import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { InterceptorLoaderRequestService } from '../services/request/interceptor-loader-request.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(InterceptorLoaderRequestService);
  let timeout = null;
  loader.setIncomingRequests(true);

  return next(req).pipe(finalize(() => {
    // timeout = setTimeout(() => { loader.idle(); }, 100);
    loader.idle();
  }));
};
