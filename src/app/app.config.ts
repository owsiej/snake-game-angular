import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SnakeIntroPageComponent } from './components/snake-intro-page/snake-intro-page.component';
import { SnakeGameComponent } from './components/snake-game/snake-game.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { RegisterFormComponent } from './components/snake-intro-page/register-form/register-form.component';
import { LoginFormComponent } from './components/snake-intro-page/login-form/login-form.component';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { logoutInterceptor } from './interceptors/logout.interceptor';
import { MainPageGuard } from './guards/main-page.guard';
import { refreshTokenInterceptor } from './interceptors/refresh-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: '',
        component: SnakeIntroPageComponent,
        canActivateChild: [MainPageGuard],
        children: [
          {
            path: 'register',
            component: RegisterFormComponent,
          },
          {
            path: 'login',
            component: LoginFormComponent,
          },
        ],
      },
      {
        path: 'game/:game-theme',
        component: SnakeGameComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ]),
    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
        refreshTokenInterceptor,
        logoutInterceptor,
      ])
    ),
  ],
};
