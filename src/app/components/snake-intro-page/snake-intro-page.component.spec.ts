import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeIntroPageComponent } from './snake-intro-page.component';

describe('SnakeIntroPageComponent', () => {
  let component: SnakeIntroPageComponent;
  let fixture: ComponentFixture<SnakeIntroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeIntroPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnakeIntroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
