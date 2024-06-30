import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-failed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-failed.component.html',
  styleUrl: './toast-failed.component.css'
})
export class ToastFailedComponent implements OnInit {

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
