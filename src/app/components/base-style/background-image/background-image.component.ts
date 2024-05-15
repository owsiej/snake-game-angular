import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SnakeBackgroundImage } from '../../../models/snake-background-image';
import { BaseStyleComponent } from '../base-style.component';
import { StyleOptions } from '../../../models/style-options';

@Component({
  selector: 'app-background-image',
  standalone: true,
  imports: [FormsModule],
  templateUrl: '../base-style.component.html',
  styleUrl: './background-image.component.scss',
})
export class BackgroundImageComponent extends BaseStyleComponent<SnakeBackgroundImage> {
  protected override title: string = 'Background Image';
  protected override themeOptions: StyleOptions<SnakeBackgroundImage>[] =
    Object.values(SnakeBackgroundImage).map((val) => {
      const obj = {
        title: val.split('_')[2],
        value: val,
      };
      return obj;
    });
}
