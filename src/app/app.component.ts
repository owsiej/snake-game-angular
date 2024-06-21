import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}

/*




TODO

- dorzucic footer do app component
  * footer z linkami do repo kody

interceptor z refresh token po polu hastokenexpired
*/
