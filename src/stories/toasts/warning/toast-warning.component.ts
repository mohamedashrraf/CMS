import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-warning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-warning.component.html',
  styleUrl: './toast-warning.component.css'
})
export class ToastWarningComponent implements OnInit {

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
