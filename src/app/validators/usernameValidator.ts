import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UserClientService } from '../services/users/user-client.service';

export function validateUsername(
  userClientService: UserClientService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userClientService.checkUser(control.value).pipe(
      map((res) => {
        if (res === true) {
          return { ifUsernameExists: true };
        }
        return null;
      })
    );
  };
}
