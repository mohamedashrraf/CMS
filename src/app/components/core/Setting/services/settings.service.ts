import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


import { SubscriptionPlan } from '../interfaces/subscriptionPlan';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  baseURL!: string;
  private subscriptionId$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private showPlansToUpgrade$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private userCurrentPlan$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _HttpClient: HttpClient) {
    this.baseURL = environment.BASEURL;
  }

  ngOnInit(): void {
    this.getYourPlan().subscribe({
      next: (res) => {
        this.setUserCurrentPlan(res);
      }
    })
  }

  getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
    return this._HttpClient.get<SubscriptionPlan[]>(`${this.baseURL}api/Subscription/GetAllSubscription`)
  }

  getYourPlan(): Observable<SubscriptionPlan> {
    return this._HttpClient.get<SubscriptionPlan>(`${this.baseURL}api/Subscription/GetYourPlan`);
  }

  cancelSubscriptionPlan(): Observable<{ success: string, message: string }> {
    return this._HttpClient.put<{ success: string, message: string }>(`${this.baseURL}api/Subscription/CancelSubscriptionPlan`, {})
  }

  autoRenew(): Observable<any> {
    return this._HttpClient.post<any>(`${this.baseURL}api/Subscription/AutoRenew`, {})
  }

  turnOfAutoRenew(): Observable<any> {
    return this._HttpClient.post<any>(`${this.baseURL}api/Subscription/TurnOffAutoRenew`, {})
  }

  setSubscriptionId(subId: number) {
    this.subscriptionId$.next(subId);
  }

  getSubscriptionId(): Observable<number> {
    return this.subscriptionId$.asObservable();
  }

  setChangePlan(planVal?: Boolean) {
    planVal ? this.showPlansToUpgrade$.next(planVal) : this.showPlansToUpgrade$.next(!this.showPlansToUpgrade$.value);
  }

  getChangePlan(): Observable<Boolean> {
    return this.showPlansToUpgrade$.asObservable();
  }

  setUserCurrentPlan(currentPlan: any) {    
    this.userCurrentPlan$.next(currentPlan);
  }

  getUserCurrentPlan(): Observable<any> {
    return this.userCurrentPlan$.asObservable();
  }
}
