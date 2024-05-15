import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SnakeIntroPageComponent } from './components/snake-intro-page/snake-intro-page.component';
import { SnakeGameComponent } from './components/snake-game/snake-game.component';
import { provideHttpClient } from '@angular/common/http';
import { SubmitGuard } from './guards/submit.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: 'intro-page',
        component: SnakeIntroPageComponent,
      },
      {
        path: 'game-page/:game-theme',
        component: SnakeGameComponent,
        canActivate: [SubmitGuard],
      },
      {
        path: '**',
        redirectTo: 'intro-page',
      },
    ]),
    provideHttpClient(),
  ],
};
