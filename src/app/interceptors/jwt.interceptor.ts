import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { JWT_REQUIRED } from '../const/interceptor-tokens';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (req.context.get(JWT_REQUIRED)) {
    const authToken = inject(LocalStorageService).access_token;
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next(authReq);
  }
  return next(req);
};
