import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-success.component.html',
  styleUrl: './toast-success.component.css'
})
export class ToastSuccessComponent implements OnInit {

  toast!: Boolean;
  @Input('label') label!: string;
  constructor() { this.toast = false }

  ngOnInit(): void { }

  openToast() {
    this.toast = !this.toast;
  }
  
  closeToast() {
    this.toast = false;
  }
}
