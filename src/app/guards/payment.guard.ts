import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const paymentGuard: CanActivateFn = (route, state) => {
  const paymentType = sessionStorage.getItem('paymentType');
  if (paymentType) {
    return true;
  } else {
    inject(Router).navigate(['/', 'cms', 'setting'])
    return false;
  }
};
