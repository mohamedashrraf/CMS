import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSliderComponent } from './authslide.component';

describe('AuthSliderComponent', () => {
  let component: AuthSliderComponent;
  let fixture: ComponentFixture<AuthSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSliderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
