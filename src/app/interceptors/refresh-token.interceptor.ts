import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  return next(req).pipe(
    catchError((err) => {
      if (
        err.status === 401 &&
        err.error?.hasOwnProperty('hasTokenExpired') &&
        !req.url.includes('auth/refresh-token')
      ) {
        return authService.refreshTokens().pipe(
          switchMap((refreshedTokens) => {
            return next(
              req.clone({
                headers: req.headers.set(
                  'Authorization',
                  `Bearer ${refreshedTokens.access_token}`
                ),
              })
            );
          }),
          catchError((err2) => {
            if (err2.status === 401 && authService.isUserLogged()) {
              authService.logoutUserWithInvalidTokens();
            }
            return throwError(() => err2);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
