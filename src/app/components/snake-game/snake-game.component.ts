import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import {
  catchError,
  interval,
  of,
  switchMap,
  takeWhile,
  throwError,
} from 'rxjs';
import { SnakeEventsComponent } from './snake-events/snake-events.component';
import { SnakeEvent } from '../../models/snake-event';
import { GameAction } from '../../const/game-action';
import { SnakeGameActionsComponent } from './snake-game-actions/snake-game-actions.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoresClientService } from '../../services/scores/scores-client.service';
import { Score } from '../../models/score';
import { GameThemes } from '../../const/game-themes';
import { GameThemeComponent } from '../base-style/game-theme/game-theme.component';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../../services/alert.service';
import { SortPipe } from '../../pipes/sort.pipe';

@Component({
  selector: 'app-snake-game',
  standalone: true,
  imports: [
    CommonModule,
    NgxSnakeModule,
    SnakeEventsComponent,
    SnakeGameActionsComponent,
    AlertComponent,
    GameThemeComponent,
    SortPipe,
  ],
  templateUrl: './snake-game.component.html',
  styleUrl: './snake-game.component.scss',
})
export class SnakeGameComponent {
  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;
  @ViewChild(SnakeEventsComponent)
  private eventComponent!: SnakeEventsComponent;

  public currentPlayerName: string | undefined =
    this._localStorageService.username;
  public pointsCounter: number = 0;
  public playerScores: Score[] = [];

  public currentGameStatus: GameAction = GameAction.PENDING;

  private isTimerRunning: boolean = false;
  private startTime: number = 0;
  public timer: number = 0;

  public isAlertVisible: boolean = false;
  public gameTheme!: GameThemes;

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _scores: ScoresClientService,
    private _route: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _alertService: AlertService
  ) {
    this._route.params.subscribe(
      (params) => (this.gameTheme = params['game-theme'])
    );
  }

  handleThemeChange(): void {
    this._router.navigate(['game', this.gameTheme]);
  }

  logout() {
    this._authService
      .logout()
      .subscribe(() => this._router.navigate(['/login']));
  }
  changeGameStatus(status: GameAction) {
    this.currentGameStatus = status;
  }
  onActionStartPressed() {
    this._snake.actionStart();
    this.currentGameStatus === GameAction.PENDING
      ? this.sendEvent(
          new SnakeEvent(GameAction.START, this.timer, this.pointsCounter)
        )
      : this.sendEvent(
          new SnakeEvent(GameAction.RESUME, this.timer, this.pointsCounter)
        );
    this.changeGameStatus(GameAction.PLAY);
    this.startTimer();
  }
  onActionStopPressed() {
    this._snake.actionStop();
    this.changeGameStatus(GameAction.PAUSE);
    this.stopTimer();
    this.sendEvent(
      new SnakeEvent(GameAction.PAUSE, this.timer, this.pointsCounter)
    );
  }

  onActionStopResetPressed() {
    this._snake.actionReset();
    this.changeGameStatus(GameAction.PENDING);
    this.resetTimer();
    this.eventComponent.clearEvents();
    this.pointsCounter = 0;
  }

  onActionLeftPressed() {
    this._snake.actionLeft();
    this.sendEvent(
      new SnakeEvent(GameAction.LEFT, this.timer, this.pointsCounter)
    );
  }
  onActionRightPressed() {
    this._snake.actionRight();
    this.sendEvent(
      new SnakeEvent(GameAction.RIGHT, this.timer, this.pointsCounter)
    );
  }
  onActionUpPressed() {
    this._snake.actionUp();
    this.sendEvent(
      new SnakeEvent(GameAction.UP, this.timer, this.pointsCounter)
    );
  }
  onActionDownPressed() {
    this._snake.actionDown();
    this.sendEvent(
      new SnakeEvent(GameAction.DOWN, this.timer, this.pointsCounter)
    );
  }

  onDead() {
    this.changeGameStatus(GameAction.DEAD);
    this.stopTimer();
    this.sendEvent(
      new SnakeEvent(GameAction.DEAD, this.timer, this.pointsCounter)
    );
    this._scores
      .postScore({
        username: this.currentPlayerName!,
        score: this.pointsCounter,
      })
      .pipe(
        catchError((err) => of(err)),
        switchMap(() => this._scores.getUserScores(this.currentPlayerName!))
      )
      .subscribe({
        next: (userScores) => {
          this.playerScores = userScores;
          this._alertService.pushNewAlert({
            message: `Score: ${this.pointsCounter} points.`,
            type: 'window',
            status: 'info',
          });
        },
        error: () => {
          this._alertService.pushNewAlert({
            message: 'Your scores are currently unavailable.',
            type: 'window',
            status: 'error',
          });
        },
      });
  }
  onFoodEaten() {
    this.pointsCounter += 10;
    this.sendEvent(
      new SnakeEvent(GameAction.EAT, this.timer, this.pointsCounter)
    );
  }

  startTimer() {
    this.isTimerRunning = true;
    this.startTime = Date.now() - this.timer;
    interval()
      .pipe(takeWhile(() => this.isTimerRunning))
      .subscribe(() => {
        if (this.isTimerRunning) {
          this.timer = Date.now() - this.startTime;
        }
      });
  }

  stopTimer() {
    this.isTimerRunning = false;
  }

  resetTimer() {
    this.stopTimer();
    this.startTime = 0;
    this.timer = 0;
  }

  sendEvent(event: SnakeEvent) {
    this.eventComponent.handleEvent(event);
  }

  showAlert() {
    this.isAlertVisible = true;
  }

  hideAlert() {
    this.isAlertVisible = false;
  }
}
