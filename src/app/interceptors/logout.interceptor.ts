import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const logoutInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  return next(req).pipe(
    catchError((err) => {
      if (
        err.status === 401 &&
        authService.isUserLogged() &&
        !err.error?.hasOwnProperty('hasTokenExpired')
      ) {
        localStorageService.deleteTokens();
        router.navigateByUrl('/login');
      }
      return throwError(() => err);
    })
  );
};
