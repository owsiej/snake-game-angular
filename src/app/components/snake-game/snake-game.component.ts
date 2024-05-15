import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { SnakeService } from '../../services/snake.service';
import { Player } from '../../models/player';
import { interval, takeWhile } from 'rxjs';
import { SnakeEventsComponent } from './snake-events/snake-events.component';
import { SnakeEvent } from '../../models/snake-event';
import { GameAction } from '../../models/game-action';
import { SnakeGameActionsComponent } from './snake-game-actions/snake-game-actions.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HighscoresService } from '../../services/highscores.service';
import { EndGameAlertComponent } from './end-game-alert/end-game-alert.component';
import { Score } from '../../models/score';
import { GameThemes } from '../../models/game-themes';
import { GameThemeComponent } from '../base-style/game-theme/game-theme.component';

@Component({
  selector: 'app-snake-game',
  standalone: true,
  imports: [
    CommonModule,
    NgxSnakeModule,
    SnakeEventsComponent,
    SnakeGameActionsComponent,
    EndGameAlertComponent,
    GameThemeComponent,
  ],
  templateUrl: './snake-game.component.html',
  styleUrl: './snake-game.component.scss',
})
export class SnakeGameComponent implements OnInit {
  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;
  @ViewChild(SnakeEventsComponent)
  private eventComponent!: SnakeEventsComponent;

  public currentPlayer!: Player;
  public pointsCounter: number = 0;
  public playerHighScores!: Score[];

  public currentGameStatus: GameAction = GameAction.PENDING;

  private isTimerRunning: boolean = false;
  private startTime: number = 0;
  public timer: number = 0;

  public isAlertVisible: boolean = false;
  public gameTheme!: GameThemes;

  constructor(
    private _snakeService: SnakeService,
    private _router: Router,
    private _highscores: HighscoresService,
    private _route: ActivatedRoute
  ) {
    this._route.params.subscribe(
      (params) => (this.gameTheme = params['game-theme'])
    );
  }

  ngOnInit(): void {
    this._snakeService.currentPlayer.subscribe((player: Player) => {
      this.currentPlayer = player;
    });
  }

  handleThemeChange(): void {
    this._router.navigate(['game-page', this.gameTheme]);
  }

  renderFormPage() {
    this._snakeService.changeSubmit(false);
    this._snakeService.setPlayerDataOnDefault();
    this._router.navigate(['/intro-page']);
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
    this._highscores
      .postScore(
        this.currentPlayer.name,
        this.pointsCounter,
        this.currentPlayer.token
      )
      .subscribe((response) => {
        console.log(response);
        this.playerHighScores = response.filter(
          (score) => score.name === this.currentPlayer.name
        );
        this.showAlert();
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
