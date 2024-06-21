import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtService } from '../services/jwt.service';

export const MainPageGuard: CanActivateChildFn = (route, state) => {
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
    ? router.createUrlTree(['/game/standard'])
    : true;
};
