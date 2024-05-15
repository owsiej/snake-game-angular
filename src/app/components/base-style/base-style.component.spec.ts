import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseStyleComponent } from './base-style.component';

describe('BaseStyleComponent', () => {
  let component: BaseStyleComponent;
  let fixture: ComponentFixture<BaseStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseStyleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
