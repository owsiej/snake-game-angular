import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class SnakeService {
  //Subject to specjalny rodzaj observable, mozemy dodawac do niego nowe wartosci za pomoca .next()
  // jest multicast, czyli wysyla dana wartości do wszystkich obserwujących
  private submitState = new BehaviorSubject<boolean>(false); // kontroluje stan zmiennej
  // Observable - odpowiadają za dostarczanie wiadomosci, obsługując asynchroniczność
  //              oddaje wartości dopiero w momencie, gdy ktoś nie użyje metody subscribe()
  currentSubmitState = this.submitState.asObservable(); //wyrzuca stan zmiennej globalnie

  private playerSource = new BehaviorSubject<Player>({
    name: '',
    token: '',
    dateOfBirth: {
      year: 2023,
      month: 'January',
      day: 1,
    },
  });
  currentPlayer = this.playerSource.asObservable();

  changeSubmit(state: boolean) {
    this.submitState.next(state);
  }

  updateCurrentPlayer(player: Player) {
    this.playerSource.next(player);
  }

  setPlayerDataOnDefault() {
    this.playerSource.next({
      name: '',
      token: '',
      dateOfBirth: {
        year: 2023,
        month: 'January',
        day: 1,
      },
    });
  }
}
// Subject vs BehaviorSubject - Subject nie posiada wartosci wyjsciowej
//                              wiec zapisuje wartosci dopiero po uzyciu subscribe
//                            - BehaviorSubject posiada wartość wyjściową,
//                              więc możemy wyemitować wartości dodane przed subscribe
