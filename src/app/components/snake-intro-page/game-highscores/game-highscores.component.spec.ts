import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHighscoresComponent } from './game-highscores.component';

describe('GameHighscoresComponent', () => {
  let component: GameHighscoresComponent;
  let fixture: ComponentFixture<GameHighscoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameHighscoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameHighscoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
