import { Pipe, PipeTransform } from '@angular/core';
import { Score } from '../models/score';

@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(value: Score[], order: 'asc' | 'desc'): Score[] {
    return value.sort((a, b) => {
      if (order === 'desc') {
        return b.score - a.score;
      } else {
        return a.score - b.score;
      }
    });
  }
}
