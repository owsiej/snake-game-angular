import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerLogin } from '../../models/player-login';
import { Observable } from 'rxjs';
import { JwtTokens } from '../../models/jwt-tokens';
import { Urls } from '../../const/urls';
import { PlayerRegister } from '../../models/player-register';
import {
  JWT_REFRESH_REQUIRED,
  JWT_REQUIRED,
} from '../../const/interceptor-tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClientService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private _http: HttpClient) {}

  public login(playerData: PlayerLogin): Observable<JwtTokens> {
    return this._http.post<JwtTokens>(Urls.LOGIN, playerData, {
      headers: this.headers,
    });
  }

  public register(playerData: PlayerRegister): Observable<JwtTokens> {
    const { username, password, dateOfBirth } = playerData;
    const formattedDate = `${dateOfBirth.year}-${
      dateOfBirth.month
    }-${dateOfBirth.day.toString().padStart(2, '0')}`;
    return this._http.post<JwtTokens>(
      Urls.REGISTER,
      {
        username: username,
        password: password,
        dateOfBirth: formattedDate,
      },
      {
        headers: this.headers,
      }
    );
  }

  public logout() {
    return this._http.post(
      Urls.LOGOUT,
      {},
      {
        headers: this.headers,
        context: new HttpContext().set(JWT_REQUIRED, true),
      }
    );
  }

  public refreshTokens(): Observable<JwtTokens> {
    return this._http.post<JwtTokens>(
      Urls.REFRESH_TOKEN,
      {},
      {
        headers: this.headers,
        context: new HttpContext().set(JWT_REFRESH_REQUIRED, true),
      }
    );
  }
}

// tylko zapytania
