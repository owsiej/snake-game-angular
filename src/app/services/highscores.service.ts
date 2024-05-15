import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score, TokenValidation } from '../models/score';
import { Observable, catchError, of } from 'rxjs';
import { tempScores } from '../temporary_scores';

@Injectable({
  providedIn: 'root',
})
export class HighscoresService {
  constructor(private _http: HttpClient) {}

  public loadHighscores(): Observable<Score[]> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });
    const url = 'https://scores.chrum.it/scores/snake';
    return this._http.get<Array<Score>>(url, { headers }).pipe(
      catchError((err) => {
        console.log(`Error occurred: ${err.message}`);
        return of(tempScores);
      })
    );
  }

  public postScore(
    userName: string,
    score: number,
    token: string
  ): Observable<Score[]> {
    const headers = new HttpHeaders({
      'auth-token': token,
      'Content-Type': 'application/json',
    });
    const scoreToPost = {
      name: userName,
      game: 'snake',
      score: score,
    };
    const url = 'https://scores.chrum.it/scores';
    return this._http.post<Score[]>(url, scoreToPost, { headers });
  }

  public checkToken(token: string): Observable<TokenValidation> {
    const headers = new HttpHeaders({
      'auth-token': token,
      'Content-Type': 'application/json',
    });
    const url = 'https://scores.chrum.it/check-token';
    return this._http.post<TokenValidation>(url, '', { headers: headers });
  }
}
