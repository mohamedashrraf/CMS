import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

import { PaymentService } from '../../components/core/Setting/services/payment.service';
import { AuthService } from '../../components/Authentication/auth/auth.service';

@Component({
  selector: 'app-success-payment',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, RouterModule],
  templateUrl: './success-payment.component.html',
  styleUrl: './success-payment.component.css'
})
export class SuccessPaymentComponent {
  spinner!: Boolean
  paypalToken!: string;
  username!: string;
  paymentType!: string;
  price!: string;
  currentDate!: Date;
  expirationDate!: Date;
  constructor(private _PaymentService: PaymentService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _AuthService: AuthService) {
    this.spinner = false;
    this.paypalToken = "";
    this.currentDate = new Date();
    this.expirationDate = new Date();
  }

  ngOnInit(): void {
    this.expirationDate.setDate(this.expirationDate.getDate() + 30);
    if (sessionStorage.getItem('paymentTypeName')) this.paymentType = sessionStorage.getItem('paymentTypeName')?.toString() || "";
    if (sessionStorage.getItem('price')) this.price = sessionStorage.getItem('price')?.toString() || "";

    this._AuthService.getUser().subscribe({
      next: (usr) => {
        this.username = usr.fullName;
      }
    })

    if (Number(sessionStorage.getItem('paymentType')) === 2) {
      console.log("using paypal");
      this.paypalToken = this._Router.url.split("token=")[1].split("&")[0];
    }


    const paymentConfirmation = {
      paymentType: Number(sessionStorage.getItem('paymentType')),
      subscriptionId: Number(sessionStorage.getItem('subscriptionId'))
    }
    if (this.paypalToken) {
      this._PaymentService.captureOrderPaypal(this.paypalToken).subscribe({
        next: () => {
          this._PaymentService.confirmPayment(paymentConfirmation).subscribe({
            next: () => {
              console.log(paymentConfirmation);
              sessionStorage.removeItem('subscriptionId');
              sessionStorage.removeItem('paymentType');
              // this._Router.navigate(['/', 'cms', 'dashboard']);
              sessionStorage.clear();
            },
            error: (err) => {
              //this._Router.navigate(['/', 'payment', 'success']);
              console.log(err);
              // console.log("Can't go to dashboard....");
            }
          })
        },
        error: () => { }
      })
    } else {
      this._PaymentService.confirmPayment(paymentConfirmation).subscribe({
        next: () => {
          console.log(paymentConfirmation);
          sessionStorage.removeItem('subscriptionId');
          sessionStorage.removeItem('paymentType');
        },
        error: (err) => {
          //this._Router.navigate(['/', 'payment', 'success']);
          console.log(err);
          console.log("Can't go to dashboard....");
        }
      })
    }
  }

  returnHome() { this._Router.navigate(['/', 'cms', 'dashboard']); }

  ngOnDestroy(): void {
    this.paypalToken = "";
  }

}
