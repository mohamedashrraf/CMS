import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreatePaymentSessionResponse } from '../interfaces/payment';
import { ConfirmPaymentRequest, ConfirmPaymentResponse } from '../interfaces/confirm-payment';
import { PaymentHistoryResponse } from '../interfaces/payment-history';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient: HttpClient) { }

  createCheckoutSession(subscriptionId: number): Observable<CreatePaymentSessionResponse> {
    return this._HttpClient.post<CreatePaymentSessionResponse>(`${environment.BASEURL}api/Payment/CreateCheckoutSession?subscriptionId=${subscriptionId}`, {});
  }

  confirmPayment(paymentConfirmation: ConfirmPaymentRequest): Observable<ConfirmPaymentResponse> {
    // confirmPayment(request: ConfirmPaymentRequest) {
    //console.log(paymentConfirmation);
    return this._HttpClient.post<ConfirmPaymentResponse>(`${environment.BASEURL}api/Payment/PaymentConfirmation`, paymentConfirmation);
  }

  listPaymentHistory(): Observable<PaymentHistoryResponse[]> {
    return this._HttpClient.get<PaymentHistoryResponse[]>(`${environment.BASEURL}api/Payment/GetPaymentHistory`);
  }

  listPaymentHistoryWithPagination(pageNumber: number, pageSize: number): Observable<PaymentHistoryResponse> {
    return this._HttpClient.get<PaymentHistoryResponse>(`${environment.BASEURL}api/Payment/GetPaymentHistory?Page=${pageNumber}&PageSize=${pageSize}`);
  }


  // PAYPAL
  getPaypalApprovalLink(subscriptionId: number): Observable<any> {
    return this._HttpClient.post<any>(`${environment.BASEURL}api/Payment/PaypalPayment?subscriptionId=${subscriptionId}`, {})
  }
  captureOrderPaypal(token: string): Observable<any> {
    return this._HttpClient.get<any>(`${environment.BASEURL}api/Payment/CaptureOrder?orderId=${token}`)
  }
  // PAYPAL

  getPaymentHistory(searchColumn?: string, searchValue?: string): Observable<PaymentHistoryResponse> {
    if (searchColumn) {
      return this._HttpClient.get<PaymentHistoryResponse>(`${environment.BASEURL}api/Payment/GetPaymentHistory?searchColumn=${searchColumn}&searchValue=${searchValue}`);
    }
    return this._HttpClient.get<PaymentHistoryResponse>(`${environment.BASEURL}api/Payment/GetPaymentHistory`)
  }

  // download invoices
  getInvoice(id: number | undefined): Observable<any> {
    return this._HttpClient.get(`${environment.BASEURL}api/Payment/GetInvoiceById?Id=${id}`);
  }
}
