import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PlayerLogin } from '../models/player-login';
import { PlayerRegister } from '../models/player-register';
import { GameThemes } from '../models/game-themes';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  private submitStateSource$ = new BehaviorSubject<boolean>(false);
  public currentSubmitState$ = this.submitStateSource$.asObservable();

  private gameThemeSource$ = new BehaviorSubject<GameThemes>(
    GameThemes.STANDARD
  );
  public currentGameTheme$: Observable<GameThemes> =
    this.gameThemeSource$.asObservable();

  private defaultPlayerData: PlayerRegister = {
    username: '',
    password: '',
    dateOfBirth: {
      year: 0,
      month: '',
      day: 0,
    },
  };

  private playerSource$ = new BehaviorSubject<PlayerLogin | PlayerRegister>(
    this.defaultPlayerData
  );
  public currentPlayer$: Observable<PlayerLogin | PlayerRegister> =
    this.playerSource$.asObservable();

  updateSubmitState(state: boolean): void {
    this.submitStateSource$.next(state);
  }

  updateGameTheme(theme: GameThemes): void {
    this.gameThemeSource$.next(theme);
  }

  updateCurrentPlayer(player: PlayerLogin | PlayerRegister): void {
    this.playerSource$.next(player);
  }

  setPlayerDataOnDefault(): void {
    this.playerSource$.next(this.defaultPlayerData);
  }
}
