import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnakeFormComponent } from './snake-form/snake-form.component';
import { SnakeService } from '../../services/snake.service';
import { Player } from '../../models/player';
import { Router } from '@angular/router';
import { GameHighscoresComponent } from './game-highscores/game-highscores.component';
import { HighscoresService } from '../../services/highscores.service';
import { Score } from '../../models/score';
import { EMPTY, Subscription, interval, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameThemes } from '../../models/game-themes';
import { SnakeBackgroundImage } from '../../models/snake-background-image';
import { BackgroundImageComponent } from '../base-style/background-image/background-image.component';

@Component({
  selector: 'app-snake-intro-page',
  standalone: true,
  imports: [
    SnakeFormComponent,
    GameHighscoresComponent,
    CommonModule,
    FormsModule,
    BackgroundImageComponent,
  ],
  templateUrl: './snake-intro-page.component.html',
  styleUrl: './snake-intro-page.component.scss',
})
export class SnakeIntroPageComponent implements OnInit, OnDestroy {
  public testPlayer!: Player;
  public globalHighscores: Score[] = [];
  public intervalSubscription!: Subscription;

  public checkboxState: boolean = false;
  public currentBackgroundImage: SnakeBackgroundImage =
    SnakeBackgroundImage.IMAGE_1;

  public bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor(
    private _snakeService: SnakeService,
    private _router: Router,
    private _highscores: HighscoresService
  ) {
    this.handleBackgroundImageChange();
  }

  ngOnInit(): void {
    this._snakeService.currentPlayer.subscribe((player) => {
      this.testPlayer = player;
    });
    this._highscores.loadHighscores().subscribe((scores) => {
      this.globalHighscores = scores;
    });
    this.loadHighscoresOnInterval();
  }
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  handleBackgroundImageChange() {
    this.bodyTag.classList.replace(
      this.bodyTag.className,
      this.currentBackgroundImage
    );
  }

  onSubmitAction(theme: GameThemes): void {
    this._snakeService.updateCurrentPlayer(this.testPlayer);
    this._snakeService.changeSubmit(true);
    this._router.navigate(['/game-page', theme]);
  }

  loadHighscoresOnInterval(): void {
    this.intervalSubscription = interval(30000)
      .pipe(
        switchMap(() =>
          !this.checkboxState ? this._highscores.loadHighscores() : EMPTY
        )
      )
      .subscribe((scores) => {
        this.globalHighscores = scores;
      });
  }
}
