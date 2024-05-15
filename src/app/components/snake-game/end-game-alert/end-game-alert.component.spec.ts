import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameAlertComponent } from './end-game-alert.component';

describe('EndGameAlertComponent', () => {
  let component: EndGameAlertComponent;
  let fixture: ComponentFixture<EndGameAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndGameAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndGameAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
