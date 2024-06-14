import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SnakeIntroPageComponent } from './components/snake-intro-page/snake-intro-page.component';
import { SnakeGameComponent } from './components/snake-game/snake-game.component';
import { provideHttpClient } from '@angular/common/http';
import { SubmitGuard } from './guards/submit.guard';
import { RegisterFormComponent } from './components/snake-intro-page/register-form/register-form.component';
import { LoginFormComponent } from './components/snake-intro-page/login-form/login-form.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: '',
        component: SnakeIntroPageComponent,
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
        path: 'register',
        component: SnakeIntroPageComponent,
      },
      {
        path: 'game/:game-theme',
        component: SnakeGameComponent,
        canActivate: [SubmitGuard],
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ]),
    provideHttpClient(),
  ],
};
