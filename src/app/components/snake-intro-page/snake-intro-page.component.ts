import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterOutlet } from '@angular/router';
import { ScoresComponent } from './scores/scores.component';
import { ScoresClientService } from '../../services/scores/scores-client.service';
import { Score } from '../../models/score';
import {
  BehaviorSubject,
  NEVER,
  Subscription,
  interval,
  switchMap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameThemes } from '../../const/game-themes';
import { SnakeBackgroundImage } from '../../const/snake-background-image';
import { BackgroundImageComponent } from '../base-style/background-image/background-image.component';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-snake-intro-page',
  standalone: true,
  imports: [
    LoginFormComponent,
    ScoresComponent,
    CommonModule,
    FormsModule,
    BackgroundImageComponent,
    RouterOutlet,
    AlertComponent,
  ],
  templateUrl: './snake-intro-page.component.html',
  styleUrl: './snake-intro-page.component.scss',
})
export class SnakeIntroPageComponent implements OnInit, OnDestroy {
  public scores: Score[] = [];
  public intervalSubscription!: Subscription;
  public checkboxState: boolean = false;
  public currentBackgroundImage: SnakeBackgroundImage =
    SnakeBackgroundImage.IMAGE_1;
  public areScoresLoaded: boolean = true;
  public currentGameTheme!: GameThemes;

  public bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];

  private checkboxStateSubject$ = new BehaviorSubject<boolean>(true);

  constructor(
    private _scores: ScoresClientService,
    private _alertService: AlertService
  ) {
    this.handleBackgroundImageChange();
  }

  ngOnInit(): void {
    this._scores.getAllScores().subscribe({
      next: (scores) => {
        this.scores = scores;
      },
      error: () => (this.areScoresLoaded = false),
    });
    this.loadScoresOnInterval();
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

  handleCheckBoxState() {
    this.checkboxStateSubject$.next(!this.checkboxStateSubject$.getValue());
  }

  loadScoresOnInterval(): void {
    this.intervalSubscription = this.checkboxStateSubject$
      .pipe(
        switchMap((value) => {
          if (value) {
            return interval(30000);
          } else {
            return NEVER;
          }
        }),
        switchMap(() => this._scores.getAllScores())
      )
      .subscribe((scores) => {
        this.scores = scores;
      });
  }
}
