import { Component, inject } from '@angular/core';
import jsPDF from 'jspdf';
import html2PDF from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { invoice_detail } from './invoice_detail';
import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [JsonPipe, DatePipe, CurrencyPipe],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent {

  _Router = inject(Router);
  _ActivatedRoute = inject(ActivatedRoute);
  _PaymentService = inject(PaymentService);
  invoice_id!: number | undefined;
  bill!: any;
  current = Date.now()

  constructor() {
    this.bill = {
      id: 0,
      ammount: 0,
      currency: 0,
      description: "string",
      email: "string",
      name: "string",
      paymentStatus: false,
      expirationDate: "string",
      paymentType: "string",
      numberOfUsers: 0,
      seO_Usage: "string",
      numberOfPosts: 0,
      storageCapacity: 0,
    };
  }

  ngOnInit(): void {
    this.invoice_id = Number(this._ActivatedRoute.snapshot.paramMap.get('billId')) ||
      undefined;
    this._PaymentService.getInvoice(this.invoice_id).subscribe({
      next: (res) => {
        this.bill = res.data;
        console.log(this.bill);
      }, error: (err) => {
        console.log(err);
      }
    })
  }


  generatePDF() {
    const elementToPrint: any = document.getElementById('theContent');
    html2PDF(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 15, 15, 175, 230);
      pdf.setProperties({
        title: 'my invoice',
        subject: 'invoice for the last payment',
        author: 'Spatium Software',
      });
      pdf.setFontSize(10);
      pdf.save('MyInvoice.pdf');
    });
  }
}
