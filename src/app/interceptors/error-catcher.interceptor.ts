import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast/toast.service';
import { Toast, ToastType } from '../interfaces/toast';
import { Router } from '@angular/router';
import { AuthService } from '../components/Authentication/auth/auth.service';

export const errorCatcherInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  const auth = inject(AuthService);
  let message = "";

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 400:
          console.log(err);

          if (err.error.paymentState != null) {
            message = err.error.message;
            console.log(err.error);
            auth.setUnpaidUser(err.error);
            auth.saveUnpaidUserSession(err.error);
            router.navigate(['/recharge-payment'])
          }
          message = err.error.message;
          break;
        case 401:
          message = "Unauthenticated. Please login first.";
          break;
        case 403:
          message = "Unautorized to access.";
          break;
        case 404:
          console.log(err);
          message = "Page not found.";
          router.navigate(['not-found'])
          break;
        case 415:
          message = "Unsupported media type.";
          break;
        case 0:
          message = "Network connection error";
          router.navigate(['ise'])
          break;
        default:
          message = err.error.message;
          break;
      }
      toast.addToast(new Toast(ToastType.Failed, 'Error', message, 4000));
      return throwError(() => err);
    }));
};
