import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';
import { inject } from '@angular/core';

export const logoutInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  return next(req).pipe(
    catchError((err) => {
      if (
        err.status === 401 &&
        authService.isUserLogged() &&
        !err.error?.hasOwnProperty('hasTokenExpired')
      ) {
        authService.logoutUserWithInvalidTokens();
      }
      return throwError(() => err);
    })
  );
};
