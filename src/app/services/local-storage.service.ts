import { Injectable } from '@angular/core';
import { LocalStoragePlayer } from '../models/local-storage-player-data';
import { JwtTokens } from '../models/jwt-tokens';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private GAME_KEY = 'snake_game_owsiej';

  get user(): LocalStoragePlayer | null {
    const user = localStorage.getItem(this.GAME_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  set user(data: LocalStoragePlayer) {
    localStorage.setItem(this.GAME_KEY, JSON.stringify(data));
  }

  get username(): string | undefined {
    return this.user?.username;
  }

  get tokens(): JwtTokens | undefined {
    return this.user?.tokens;
  }

  set tokens(tokens: JwtTokens) {
    const user = this.user!;
    user.tokens = tokens;
    this.user = user;
  }

  get access_token(): string | undefined {
    return (this.tokens as JwtTokens)?.access_token;
  }

  get refresh_token(): string | undefined {
    return (this.tokens as JwtTokens)?.refresh_token;
  }

  deleteTokens() {
    const user = this.user!;
    delete user.tokens;
    this.user = user;
  }
}
