import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../components/Authentication/auth/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const token = inject(AuthService).Token;
  console.log(token);

  console.log('is-loggedin guard');
  console.log(token && inject(AuthService).getPaymentState);
  if (token && inject(AuthService).getPaymentState) {
    inject(Router).navigate(['/cms']);
    return false;
  }
  else {
    return true;
  }
};
