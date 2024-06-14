import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { SnakeService } from '../../services/snake.service';
import { Router, RouterOutlet } from '@angular/router';
import { GameHighscoresComponent } from './game-highscores/game-highscores.component';
import { HighscoresService } from '../../services/highscores.service';
import { Score } from '../../models/score';
import {
  BehaviorSubject,
  NEVER,
  Observable,
  Subscription,
  interval,
  switchMap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameThemes } from '../../models/game-themes';
import { SnakeBackgroundImage } from '../../models/snake-background-image';
import { BackgroundImageComponent } from '../base-style/background-image/background-image.component';
import { PlayerLogin } from '../../models/player-login';

@Component({
  selector: 'app-snake-intro-page',
  standalone: true,
  imports: [
    LoginFormComponent,
    GameHighscoresComponent,
    CommonModule,
    FormsModule,
    BackgroundImageComponent,
    RouterOutlet,
  ],
  templateUrl: './snake-intro-page.component.html',
  styleUrl: './snake-intro-page.component.scss',
})
export class SnakeIntroPageComponent implements OnInit, OnDestroy {
  public globalHighscores: Score[] = [];
  public intervalSubscription!: Subscription;
  public submitSubscription!: Subscription;
  public checkboxState: boolean = false;
  public currentBackgroundImage: SnakeBackgroundImage =
    SnakeBackgroundImage.IMAGE_1;

  public currentGameTheme!: GameThemes;

  public bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];

  private checkboxStateSubject$ = new BehaviorSubject<boolean>(true);

  constructor(
    private _snakeService: SnakeService,
    private _router: Router,
    private _highscores: HighscoresService
  ) {
    this.submitSubscription = this._snakeService.currentSubmitState$.subscribe(
      (state) => {
        if (state) {
          this.onSubmitAction();
        }
      }
    );
    this.handleBackgroundImageChange();
  }

  ngOnInit(): void {
    // this._highscores.loadHighscores().subscribe((scores) => {
    //   this.globalHighscores = scores;
    // });
    // this.loadHighscoresOnInterval();
  }
  ngOnDestroy(): void {
    // this.intervalSubscription.unsubscribe();
    this.submitSubscription.unsubscribe();
  }

  handleBackgroundImageChange() {
    this.bodyTag.classList.replace(
      this.bodyTag.className,
      this.currentBackgroundImage
    );
  }

  onSubmitAction(): void {
    this._snakeService.currentGameTheme$.subscribe((theme) => {
      this.currentGameTheme = theme;
    });

    this._router.navigate(['/game', this.currentGameTheme]);
  }

  handleCheckBoxState() {
    this.checkboxStateSubject$.next(!this.checkboxStateSubject$.getValue());
  }

  loadHighscoresOnInterval(): void {
    this.intervalSubscription = this.checkboxStateSubject$
      .pipe(
        switchMap((value) => {
          if (value) {
            return interval(30000);
          } else {
            return NEVER;
          }
        }),
        switchMap(() => this._highscores.loadHighscores())
      )
      .subscribe((scores) => {
        this.globalHighscores = scores;
      });
  }
}
