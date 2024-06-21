import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../models/error-alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSource$ = new Subject<Alert>();

  public currentAlert$ = this.alertSource$.asObservable();

  public pushNewAlert(alert: Alert) {
    this.alertSource$.next(alert);
  }
}
