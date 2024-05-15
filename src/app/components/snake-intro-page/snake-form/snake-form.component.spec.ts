import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeFormComponent } from './snake-form.component';

describe('SnakeFormComponent', () => {
  let component: SnakeFormComponent;
  let fixture: ComponentFixture<SnakeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnakeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
