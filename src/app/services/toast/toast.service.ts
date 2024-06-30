import { Injectable } from '@angular/core';
import { Toast, ToastType } from '../../interfaces/toast';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private Toast$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  timeOut!: any;
  currentToast!: Toast[];

  constructor() {
    this.currentToast = []
  }

  addToast(toast: Toast) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.currentToast = [];
    this.currentToast.push(toast);
    this.Toast$.next(true);

    this.timeOut = setTimeout(() => {
      this.Toast$.next(false);
      this.currentToast = [];
    }, this.currentToast[0].duration)
  }

  toggleToast() {
    this.Toast$.next(!this.Toast$.value);
  }

  getToast(): Observable<Boolean> {
    return this.Toast$;
  }

  getCurrentToast(): Toast {
    return this.currentToast[0];
  }

}
