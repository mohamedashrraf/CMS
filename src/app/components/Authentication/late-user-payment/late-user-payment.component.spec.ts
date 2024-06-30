import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateUserPaymentComponent } from './late-user-payment.component';

describe('LateUserPaymentComponent', () => {
  let component: LateUserPaymentComponent;
  let fixture: ComponentFixture<LateUserPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateUserPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LateUserPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
