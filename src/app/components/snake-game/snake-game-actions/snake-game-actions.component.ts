import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameAction } from '../../../models/game-action';
import { CommonModule } from '@angular/common';
import { TimerFormatterPipe } from '../../../pipes/timer-formatter.pipe';

@Component({
  selector: 'app-snake-game-actions',
  standalone: true,
  imports: [FormsModule, CommonModule, TimerFormatterPipe],
  templateUrl: './snake-game-actions.component.html',
  styleUrl: './snake-game-actions.component.scss',
})
export class SnakeGameActionsComponent {
  @Input() gameStatus!: GameAction;
  @Input() timer!: number;

  allGameAction = GameAction;

  @Output() public start = new EventEmitter();
  @Output() public stop = new EventEmitter();
  @Output() public reset = new EventEmitter();
  @Output() public up = new EventEmitter();
  @Output() public right = new EventEmitter();
  @Output() public left = new EventEmitter();
  @Output() public down = new EventEmitter();
  @Output() public quit = new EventEmitter();

  onStart() {
    this.start.emit();
  }

  onStop() {
    this.stop.emit();
  }

  onReset() {
    this.reset.emit();
  }
  onUp() {
    this.up.emit();
  }
  onRight() {
    this.right.emit();
  }
  onLeft() {
    this.left.emit();
  }
  onDown() {
    this.down.emit();
  }
  onQuit() {
    this.quit.emit();
  }
}
