import { GameAction } from './game-action';

export class SnakeEvent {
  constructor(
    public action: GameAction,
    public timestamp: number,
    public currentScore: number
  ) {
    this.action = action;
    this.timestamp = this.timestamp;
    this.currentScore = currentScore;
  }
}
