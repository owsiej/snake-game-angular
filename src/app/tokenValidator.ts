import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { HighscoresService } from './services/highscores.service';

export function validateToken(
  scoreService: HighscoresService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return scoreService.checkToken(control.value).pipe(
      map((res) => {
        if (res.success !== true) {
          return { tokenValidationFailed: true };
        }
        return null;
      })
    );
  };
}
