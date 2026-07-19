import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast  = inject(ToastService);
  const auth   = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        auth.logout();
        toast.error('Session expired — please log in again.');
      } else if (err.status === 403) {
        toast.error('You do not have permission to do that.');
      } else if (err.status === 0) {
        toast.error('Cannot reach the server. Check your connection.');
      } else {
        const msg = err.error?.message || err.error?.title || err.message || 'An error occurred.';
        toast.error(msg);
      }
      return throwError(() => err);
    })
  );
};
