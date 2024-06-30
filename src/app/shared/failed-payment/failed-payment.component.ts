import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { PaymentService } from '../../components/core/Setting/services/payment.service';


@Component({
  selector: 'app-failed-payment',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './failed-payment.component.html',
  styleUrl: './failed-payment.component.css'
})
export class FailedPaymentComponent {
  spinner!: Boolean
  paypalToken!: string;
  constructor(private _PaymentService: PaymentService, private _Router: Router, private _ActivatedRoute: ActivatedRoute) {
    this.spinner = false;
    this.paypalToken = "";
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  returnHome() {
    this._Router.navigate(['/', 'cms', 'dashboard']);
  }

}
