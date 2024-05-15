import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Score } from '../../../models/score';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-end-game-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './end-game-alert.component.html',
  styleUrl: './end-game-alert.component.scss',
})
export class EndGameAlertComponent {
  @Input() public score: number = 0;
  @Input() public playerScores!: Score[];
  @Output() public closeAlertEvent = new EventEmitter();

  onHideAlert() {
    this.closeAlertEvent.emit();
  }
}
