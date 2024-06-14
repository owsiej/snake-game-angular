import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GameThemes } from '../../../models/game-themes';
import { GameThemeComponent } from '../../base-style/game-theme/game-theme.component';
import { RegexPatterns } from '../../../models/regex-patterns';
import { SnakeService } from '../../../services/snake.service';
import { RouterModule } from '@angular/router';

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

  public snakeForm = this._fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(RegexPatterns.LOGIN)],
    ],
    password: [
      '',
      [Validators.required, Validators.pattern(RegexPatterns.PASSWORD)],
    ],
  });

  constructor(private _fb: FormBuilder, private _snakeService: SnakeService) {
    this._snakeService.currentGameTheme$.subscribe(
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
    this._snakeService.updateCurrentPlayer({
      username: this.username.value!,
      password: this.password.value!,
    });
    this._snakeService.updateGameTheme(this.currentGameTheme);
    this._snakeService.updateSubmitState(true);
  }
}
