import { Component } from '@angular/core';
import { SettingsService } from '../../core/Setting/services/settings.service';
import { PaymentService } from '../../core/Setting/services/payment.service';
import { Router } from '@angular/router'
import { paymentType } from '../../core/Setting/interfaces/payment';
import { CommonModule } from '@angular/common';


declare var Stripe: any;


@Component({
  selector: 'app-late-user-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './late-user-payment.component.html',
  styleUrl: './late-user-payment.component.css'
})
export class LateUserPaymentComponent {

  selectedPlan!: any;
  stripe!: any;


  constructor(
    private _SettingService: SettingsService,
    private _PaymentService: PaymentService,
    private _Router: Router) {
    this.stripe = Stripe('pk_test_51OClKSB9CC2qmsF8mMnRcNL7PDhS84UvucA7aDP4blXSoBvkslPBKQBWa9H7kqMVQl7upCF5TCcVki3UuXtsLF8600jbqwfKBJ');
    this.selectedPlan = {
      id: 3,
      title: "sss",
      price: "sss"
    }
  }


  ngOnInit(): void {
    sessionStorage.clear();
    this._SettingService.getYourPlan().subscribe({
      next: (res) => {
        console.log(res);
        this.selectedPlan = res;
      },
      error: (err) => {
        console.log(err);
      }
    });


  }

  changePaymentMethod(paymentMethod: number) {
    if (paymentMethod == 1) {
      sessionStorage.setItem("paymentType", paymentType.stripe.toString());
      sessionStorage.setItem("paymentTypeName", 'Stripe');
    }
    else {
      sessionStorage.setItem("paymentType", paymentType.paypal.toString());
      sessionStorage.setItem("paymentTypeName", 'Paypal');
    }
  }

  switchSubscriptionPlan() {
    this._SettingService.setChangePlan(false);
    sessionStorage.setItem("price", this.selectedPlan.price.toString());
    sessionStorage.setItem("subscriptionId", this.selectedPlan.id.toString());

    if (sessionStorage.getItem("paymentType") === "1" || sessionStorage.getItem("paymentType") == undefined) {
      this._PaymentService.createCheckoutSession(this.selectedPlan.id).subscribe({
        next: (session) => {
          this.stripe.redirectToCheckout({
            sessionId: session.sessionId
          });
          sessionStorage.setItem("stripeSessionId", session.sessionId);
        }
      });
    } else {
      this._PaymentService.getPaypalApprovalLink(this.selectedPlan.id).subscribe({
        next: (res) => {
          const link = res.links[1].href;
          const customPaypalLink = document.createElement('a');
          customPaypalLink.setAttribute('href', link);
          customPaypalLink.click();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

  }

}
