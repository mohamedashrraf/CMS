import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedPaymentComponent } from './failed-payment.component';

describe('FailedPaymentComponent', () => {
  let component: FailedPaymentComponent;
  let fixture: ComponentFixture<FailedPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
