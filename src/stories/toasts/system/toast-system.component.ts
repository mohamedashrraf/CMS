import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-system.component.html',
  styleUrl: './toast-system.component.css'
})
export class ToastSystemComponent implements OnInit {

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
