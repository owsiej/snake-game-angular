import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SnakeEvent } from '../../../models/snake-event';
import { TimerFormatterPipe } from '../../../pipes/timer-formatter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-snake-events',
  standalone: true,
  imports: [CommonModule, TimerFormatterPipe, FormsModule],
  templateUrl: './snake-events.component.html',
  styleUrl: './snake-events.component.scss',
})
export class SnakeEventsComponent {
  events: Array<SnakeEvent> = [];
  selectedAction: string = 'All actions';
  displayedEvents: Array<SnakeEvent> = this.events;

  handleEvent(event: SnakeEvent) {
    this.events.push(event);
  }

  clearEvents() {
    this.events = [];
    this.displayedEvents = this.events;
  }

  availableActions() {
    return [...new Set(this.events.map((event) => event.action))].sort();
  }
  sortEventsDesc() {
    return this.displayedEvents.sort((a, b) => b.timestamp - a.timestamp);
  }
  sortEventsAsc() {
    return this.displayedEvents.sort((a, b) => a.timestamp - b.timestamp);
  }
  updateDisplayedEvents() {
    this.displayedEvents =
      this.selectedAction === 'All actions'
        ? this.events
        : this.events.filter((event) => event.action === this.selectedAction);
  }
}
