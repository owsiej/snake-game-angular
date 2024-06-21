import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtService } from '../services/jwt.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  let isTokenValid;
  try {
    isTokenValid = JwtService.isTokenValid(localStorageService.access_token!);
  } catch (error) {
    isTokenValid = false;
  }

  return authService.isUserLogged() && isTokenValid
    ? true
    : router.createUrlTree(['/login']);
};
