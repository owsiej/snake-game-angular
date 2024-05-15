import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SnakeService } from '../services/snake.service';

export const SubmitGuard: CanActivateFn = (route, state) => {
  const snakeService = inject(SnakeService);
  const router = inject(Router);
  let submitState;
  snakeService.currentSubmitState.subscribe((val) => (submitState = val));

  return submitState ? true : router.createUrlTree(['intro-page']);
};
