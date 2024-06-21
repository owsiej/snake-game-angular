import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameThemes } from '../../../const/game-themes';
import { GameThemeComponent } from '../../base-style/game-theme/game-theme.component';
import { RegexPatterns } from '../../../const/regex-patterns';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { PlayerLogin } from '../../../models/player-login';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GameThemeComponent,
    RouterModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  public currentGameTheme!: GameThemes;
  private lsUserName: string = this._localStorageService.username ?? '';

  public snakeForm = this._fb.group({
    username: [
      this.lsUserName,
      [Validators.required, Validators.pattern(RegexPatterns.LOGIN)],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(RegexPatterns.PASSWORD)],
    ],
  });

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _alertService: AlertService
  ) {
    this._authService.currentGameTheme$.subscribe(
      (theme) => (this.currentGameTheme = theme)
    );
  }

  public get username() {
    return this.snakeForm.controls.username;
  }
  public get password() {
    return this.snakeForm.controls.password;
  }

  onSubmit() {
    const playerData: PlayerLogin = {
      username: this.username.value!,
      password: this.password.value!,
    };

    this._authService.login(playerData).subscribe({
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
}
