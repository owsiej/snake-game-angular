import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeGameActionsComponent } from './snake-game-actions.component';

describe('SnakeGameActionsComponent', () => {
  let component: SnakeGameActionsComponent;
  let fixture: ComponentFixture<SnakeGameActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeGameActionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnakeGameActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
