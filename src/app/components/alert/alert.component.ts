import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Alert } from '../../models/error-alert';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit, OnDestroy {
  @Output() public closeAlertEvent = new EventEmitter();

  public isAlertVisible: boolean = false;
  public alert!: Alert;
  public alertSubscription!: Subscription;

  constructor(private _alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this._alertService.currentAlert$.subscribe(
      (alert) => {
        this.alert = alert;
        this.isAlertVisible = true;
      }
    );
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }

  hideAlert() {
    this.isAlertVisible = false;
  }
}
