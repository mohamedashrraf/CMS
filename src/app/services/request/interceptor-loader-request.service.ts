import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorLoaderRequestService {

  private incomingRequests: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private requestsCount: number = 0;
  constructor() { }

  setIncomingRequests(status: boolean) {
    this.requestsCount++;
    this.incomingRequests.next(status);
  }

  getIncomingRequests(): Observable<Boolean> {
    return this.incomingRequests.asObservable();
  }

  idle() {
    this.requestsCount--;
    if (this.requestsCount <= 0) {
      this.requestsCount = 0;
      //hide the spinner
      this.incomingRequests.next(false);
    }
  }
}
