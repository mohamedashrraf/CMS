import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastType } from '../../../interfaces/toast';

@Component({
  selector: 'app-toast-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-system.component.html',
  styleUrl: './toast-system.component.css'
})
export class ToastSystemComponent implements OnInit {

  @Input('toast') toast!: Boolean;
  @Input('toastType') toastType: ToastType = ToastType.System;
  @Input('label') label: string = 'System';
  @Input('info') info: string = 'System Message is sent successfully';
  @Input('duration') duration: number = 3000;

  @Output() closeT = new EventEmitter<void>();

  constructor() { this.toast = false }

  ngOnInit(): void { }

  openToast() {
    this.toast = !this.toast;
  }

}
