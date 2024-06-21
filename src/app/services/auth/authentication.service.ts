import { Injectable } from '@angular/core';
import { AuthenticationClientService } from './authentication-client.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { GameThemes } from '../../const/game-themes';
import { PlayerRegister } from '../../models/player-register';
import { PlayerLogin } from '../../models/player-login';
import { LocalStorageService } from '../local-storage.service';
import { JwtTokens } from '../../models/jwt-tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private gameThemeSource$ = new BehaviorSubject<GameThemes>(
    GameThemes.STANDARD
  );
  public currentGameTheme$: Observable<GameThemes> =
    this.gameThemeSource$.asObservable();

  updateGameTheme(theme: GameThemes): void {
    this.gameThemeSource$.next(theme);
  }

  constructor(
    private _authClientService: AuthenticationClientService,
    private _localStorageService: LocalStorageService
  ) {}

  public isUserLogged(): boolean {
    return !!(
      this._localStorageService.username && this._localStorageService.tokens
    );
  }

  public login(playerData: PlayerLogin): Observable<JwtTokens> {
    return this._authClientService.login(playerData).pipe(
      map((resTokens) => {
        this._localStorageService.user = {
          username: playerData.username,
          tokens: resTokens,
        };
        return resTokens;
      })
    );
  }

  public register(playerData: PlayerRegister): Observable<JwtTokens> {
    return this._authClientService.register(playerData).pipe(
      map((resTokens) => {
        this._localStorageService.user = {
          username: playerData.username,
          tokens: resTokens,
        };

        return resTokens;
      })
    );
  }

  public logout() {
    return this._authClientService
      .logout()
      .pipe(tap(() => this._localStorageService.deleteTokens()));
  }
}
