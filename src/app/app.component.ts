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
frontend - wysyla zapytanie do backend czy dany uzytkownik istnieje (get po name), jezeli istnieje to po sumbit idzie do api/login a jak nie to /register
         - front musi porywnywac podana i shashowana date urodzin,
         - dodaje ostatnia date urodzin i username do local storage i od razu uzupelnia tymi danymi formularz (serwis)
         - ma dostep rowniez do tokenu w localStorage i jezeli taki token istnieje to wysyla do api przez endpoint login albo przez nowy typu verifySession
           te wszystkie dane i jezeli token jest aktywny i all gra to przenosi od razu do gry a jezeli nie to do formularza logowania
         - blokada post score z points ponizej 10
         - interceptor z dodawaniem auth headera do requestow
         - blokada jak ktos poda kilka razy nieprawidlowe haslo



TODO

- pole username z zapisem do local storage
- zajac się parowaniem z api
  * async walidator na login przy rejestracji
- interceptor do wstawiania access tokena z local storage do naglowka
- dorzucic nav i footer do app component
  * footer z linkami do repo kody
  * navbar z klawiszem wyloguj, swoimi wynikami w game, 
- guarda na endpoint game-page(zmienic na game), jezeli w local storage jest zapisany user z dobrymi tokenami to przenosimy na login, jezeli nie to back do /login
*/
