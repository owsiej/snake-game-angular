import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameThemes } from '../../../models/game-themes';
import { StyleOptions } from '../../../models/style-options';
import { BaseStyleComponent } from '../base-style.component';

@Component({
  selector: 'app-game-theme',
  standalone: true,
  imports: [FormsModule],
  templateUrl: '../base-style.component.html',
  styleUrl: './game-theme.component.scss',
})
export class GameThemeComponent extends BaseStyleComponent<GameThemes> {
  protected override title: string = 'Game Theme';
  protected override themeOptions: StyleOptions<GameThemes>[] = Object.values(
    GameThemes
  ).map((val) => {
    const obj = {
      title: val[0].toUpperCase() + val.slice(1).replaceAll('-', ' '),
      value: val,
    };
    return obj;
  });
}
