import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Score } from '../../models/score';
import { Observable } from 'rxjs';
import { Urls } from '../../const/urls';
import { JWT_REQUIRED } from '../../const/interceptor-tokens';

@Injectable({
  providedIn: 'root',
})
export class ScoresClientService {
  constructor(private _http: HttpClient) {}

  public getAllScores(): Observable<Score[]> {
    return this._http.get<Array<Score>>(Urls.GET_ALL_SCORES);
  }

  public getUserScores(username: string): Observable<Score[]> {
    return this._http.get<Array<Score>>(Urls.GET_ALL_SCORES + `/${username}`, {
      context: new HttpContext().set(JWT_REQUIRED, true),
    });
  }

  public postScore(scoreData: Score): Observable<Score[]> {
    return this._http.post<Score[]>(Urls.POST_SCORE, scoreData, {
      context: new HttpContext().set(JWT_REQUIRED, true),
    });
  }
}
