import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Player } from '../../../models/player';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import moment from 'moment';
import { GameThemes } from '../../../models/game-themes';
import { validateToken } from '../../../tokenValidator';
import { HighscoresService } from '../../../services/highscores.service';
import { GameThemeComponent } from '../../base-style/game-theme/game-theme.component';

@Component({
  selector: 'app-snake-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GameThemeComponent],
  templateUrl: './snake-form.component.html',
  styleUrl: './snake-form.component.scss',
})
export class SnakeFormComponent implements OnChanges {
  @Input() public testPlayer!: Player;

  @Output() public submitEvent = new EventEmitter();

  public currentGameTheme: GameThemes = GameThemes.STANDARD;

  public snakeForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.pattern(/^[0-9a-zA-z]{3,15}$/)],
    ],
    token: [
      '',
      {
        validators: [Validators.required],
        asyncValidators: [validateToken(this._highscores)],
        updateOn: 'blur',
      },
    ],
    dateOfBirth: this.fb.group({
      year: [0],
      month: [''],
      day: [0],
    }),
  });
  constructor(public fb: FormBuilder, private _highscores: HighscoresService) {
    this.year.valueChanges.subscribe(() => this.resetDayNumber());
    this.month.valueChanges.subscribe(() => this.resetDayNumber());
  }
  ngOnChanges(): void {
    this.snakeForm.setValue(this.testPlayer);
  }

  public get name() {
    return this.snakeForm.controls.name;
  }
  public get token() {
    return this.snakeForm.controls.token;
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
    this.testPlayer.name = this.name.value!;
    this.testPlayer.token = this.token.value!;
    this.testPlayer.dateOfBirth.day = this.day.value!;
    this.testPlayer.dateOfBirth.month = this.month.value!;
    this.testPlayer.dateOfBirth.year = this.year.value!;
    this.submitEvent.emit(this.currentGameTheme);
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
      (val, idx) => idx + 1
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
