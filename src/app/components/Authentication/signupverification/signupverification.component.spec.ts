import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupverificationComponent } from './signupverification.component';

describe('SignupverificationComponent', () => {
  let component: SignupverificationComponent;
  let fixture: ComponentFixture<SignupverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupverificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
