import { Component, Input } from '@angular/core';
import { Score } from '../../../models/score';
import { CommonModule } from '@angular/common';
import { SortPipe } from '../../../pipes/sort.pipe';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule, SortPipe, AlertComponent],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss',
})
export class ScoresComponent {
  @Input() public scores: Score[] = [];
  @Input() public areScoresLoaded: boolean = true;
  public sortOrder: 'asc' | 'desc' = 'desc';
}
