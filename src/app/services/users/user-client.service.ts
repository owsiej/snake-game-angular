import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from '../../const/urls';

@Injectable({
  providedIn: 'root',
})
export class UserClientService {
  constructor(private _http: HttpClient) {}

  public checkUser(username: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.set('username', username);
    return this._http.get<boolean>(Urls.CHECK_USER, { params });
  }
}
