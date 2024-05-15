import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeEventsComponent } from './snake-events.component';

describe('SnakeEventsComponent', () => {
  let component: SnakeEventsComponent;
  let fixture: ComponentFixture<SnakeEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnakeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
