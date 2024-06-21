import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import moment from 'moment';
import { GameThemes } from '../../../const/game-themes';
import { GameThemeComponent } from '../../base-style/game-theme/game-theme.component';
import { Router, RouterModule } from '@angular/router';
import { RegexPatterns } from '../../../const/regex-patterns';
import { validateUsername } from '../../../validators/usernameValidator';
import { UserClientService } from '../../../services/users/user-client.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { PlayerRegister } from '../../../models/player-register';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GameThemeComponent,
    RouterModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  public currentGameTheme!: GameThemes;

  public snakeForm = this._fb.group(
    {
      username: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(RegexPatterns.LOGIN),
          ],
          asyncValidators: [validateUsername(this._userClientService)],
          updateOn: 'blur',
        },
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.PASSWORD)],
      ],
      confirmPassword: [''],
      dateOfBirth: this._fb.group({
        year: [2000],
        month: ['January'],
        day: [1],
      }),
    },
    {
      validators: [
        (group: AbstractControl): ValidationErrors | null => {
          const pass1 = group.get('password');
          const pass2 = group.get('confirmPassword');
          if (pass1?.value !== pass2?.value) {
            pass2?.setErrors({ differentPasswords: true });
          }
          if (!pass1 || !pass2) {
            return null;
          }
          return null;
        },
      ],
    } as AbstractControlOptions
  );
  public setOfYears: Array<number> = this.generateYears();
  public setOfMonths: Array<string> = this.generateMonths();
  public setOfDays: Array<number> = this.generateDays();

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _userClientService: UserClientService,
    private _router: Router,
    private _alertService: AlertService
  ) {
    this._authService.currentGameTheme$.subscribe(
      (theme) => (this.currentGameTheme = theme)
    );
  }

  ngOnInit(): void {
    this.year.valueChanges.subscribe(() => {
      this.resetDayNumber();
      this.setOfMonths = this.generateMonths();
      this.setOfDays = this.generateDays();
    });
    this.month.valueChanges.subscribe(() => {
      this.resetDayNumber();
      this.setOfDays = this.generateDays();
    });
  }

  public get username() {
    return this.snakeForm.controls.username;
  }
  public get password() {
    return this.snakeForm.controls.password;
  }

  public get confirmPassword() {
    return this.snakeForm.controls.confirmPassword;
  }

  public get year() {
    return this.snakeForm.controls.dateOfBirth.controls.year;
  }

  public get month() {
    return this.snakeForm.controls.dateOfBirth.controls.month;
  }

  public get day() {
    return this.snakeForm.controls.dateOfBirth.controls.day;
  }

  onSubmit() {
    const playerData: PlayerRegister = {
      username: this.username.value!,
      password: this.password.value!,
      dateOfBirth: {
        year: this.year.value!,
        month: moment().month(this.month.value!).format('MM'),
        day: this.day.value!,
      },
    };
    this._authService.register(playerData).subscribe({
      next: () => {
        this._authService.updateGameTheme(this.currentGameTheme),
          this._router.navigate(['/game', this.currentGameTheme]);
      },
      error: (e) => {
        if (e.status === 0) {
          this._alertService.pushNewAlert({
            message: 'Server does not respond.',
            type: 'window',
            status: 'error',
          });
        } else {
          this._alertService.pushNewAlert({
            ...e.error,
            type: 'window',
            status: 'error',
          });
        }
      },
    });
  }

  generateDays(): Array<number> {
    let numberOfDays: number = 0;
    if (
      this.year.value == moment().year() &&
      this.month.value == moment().format('MMMM')
    ) {
      numberOfDays = +moment().format('D');
    } else {
      numberOfDays = moment(
        `${this.year.value}-${this.month.value}`,
        'YYYY-MMMM'
      ).daysInMonth();
    }

    return Array.from(
      {
        length: numberOfDays,
      },
      (_, idx) => idx + 1
    );
  }
  generateMonths(): Array<string> {
    moment.locale('en');
    if (this.year.value == moment().year()) {
      return moment
        .months()
        .slice(0, moment.months().indexOf(moment().format('MMMM')) + 1);
    }
    return moment.months();
  }
  generateYears(): Array<number> {
    const years = [];
    for (let i = moment().year(); i >= 1920; i--) {
      years.push(i);
    }
    return years;
  }
  resetDayNumber() {
    this.day.setValue(1);
  }
}
