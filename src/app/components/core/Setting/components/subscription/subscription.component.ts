import { Component, OnDestroy, OnInit, ViewChild, ElementRef, Input, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { BreadcrumbService } from '../../../../../services/breadcrumb/breadcrumb.service';
import { SpinnerComponent } from '../../../../../shared/spinner/spinner.component';
import { ToastSystemComponent } from '../../../../../shared/toasts/system/toast-system.component';
import { SettingsService } from '../../services/settings.service';
import { SubscriptionPlan } from '../../interfaces/subscriptionPlan';
import { ToastService } from '../../../../../services/toast/toast.service';
import { Toast, ToastType } from '../../../../../interfaces/toast';
import { PaymentService } from '../../services/payment.service';
import { paymentType } from '../../interfaces/payment';
import { FilterComponent } from '../../../../../shared/filter/filter.component';
import { PaymentHistoryResponse } from '../../interfaces/payment-history';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { PaginatorComponent } from '../../../../../shared/paginator/paginator.component';
import { FilterHeader } from '../../../../../shared/filter/filter-header.interface';
import { environment } from '../../../../../../environments/environment';


declare var Stripe: any;

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [SpinnerComponent, CommonModule, DecimalPipe, DatePipe, ToastSystemComponent, FilterComponent, PaginatorComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})


export class SubscriptionComponent implements OnInit, OnDestroy {
  //-----------------------Inputs Outputs-----------------------//
  @Input() showPlansToUpgrade!: Boolean;

  //-----------------------ViewChilds-----------------------//
  @ViewChild('usage', { static: false }) usage!: ElementRef;
  @ViewChild('usageFree', { static: false }) usageFree!: ElementRef;
  @ViewChild('filterEl', { static: false }) filterEl!: ElementRef;

  /** For YEARLY MONTHLY TOGGLE */
  // @ViewChild('yearly') defaultSubscriptionDuration!: ElementRef
  /** For YEARLY MONTHLY TOGGLE */

  //----------------------- VARS --------------------------------/
  changePlan!: Boolean;
  paymentType: any = null;
  ToastValue!: Boolean;
  currentToast!: Toast;
  subscriptionPlans!: SubscriptionPlan[];
  filteration!: string[];
  subscriptionPlanId: number;
  subscriptionPlanPrice: number;
  stripe!: any;
  currentUserPlan!: any;
  bills!: PaymentHistoryResponse;
  selectedPlan!: any;
  differentSelectedPlan!: any;
  rowsNumber!: number;
  activeFilter!: Boolean;
  filterHeaders: FilterHeader[] = [
    { key: 'paymentType', displayName: "Payment Type" },
    { key: 'expirationDate', displayName: "Expiration Date" },
    { key: 'amount', displayName: "Amount" }
  ]
  //----------------------- Injects --------------------------------/


  constructor(private _BreadCurmb: BreadcrumbService,
    private _SettingService: SettingsService,
    private _ToastService: ToastService,
    private _PaymentService: PaymentService,
    private _Router: Router) {
    this.subscriptionPlans = [];
    this.subscriptionPlanId = 0;
    this.subscriptionPlanPrice = 0;
    this.changePlan = false;
    this.currentUserPlan = 0;
    this.stripe = Stripe('pk_test_51OClKSB9CC2qmsF8mMnRcNL7PDhS84UvucA7aDP4blXSoBvkslPBKQBWa9H7kqMVQl7upCF5TCcVki3UuXtsLF8600jbqwfKBJ');
    this.filteration = ['title'];
    this.rowsNumber = 5;
    this.bills = {
      data: [
        {
          id: 0,
          ammount: "string",
          currency: "string",
          description: "string",
          email: "string",
          name: "string",
          paymentStatus: false,
          expirationDate: new Date(),
          paymentType: "string"
        }
      ],
      total: 0,
      pagesNumbr: 0,
      success: false,
      message: "string"
    };
    this.showPlansToUpgrade = false;
    this.activeFilter = false;
  }

  //----------------------- On init --------------------------------/

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();
    this.getHistory();
    this._SettingService.getChangePlan().subscribe({
      next: (val) => {
        this.changePlan = val
      }
    });
    this._SettingService.getYourPlan().subscribe({
      next: (res) => {
        this.currentUserPlan = res;
        this.selectedPlan = res;
        // this.usage.nativeElement.style.width = `${(this.currentUserPlan.countOfCapacity / this.currentUserPlan.storageCapacity) * 100}%`;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this._SettingService.getSubscriptionPlans().subscribe({
      next: (plans) => {
        this.subscriptionPlans = plans;
      },
      error: () => {
      }
    });
    this._SettingService.getUserCurrentPlan().subscribe({
      next: (res) => {
        this.selectedPlan = res;
      }
    })
  }

  /** For YEARLY MONTHLY TOGGLE */
  // chooseSubscriptionPlanDuration(first: HTMLElement, second: HTMLElement) {
  //   first.classList.add('subscription-duration-active');
  //   second.classList.remove('subscription-duration-active');
  // }
  /** For YEARLY MONTHLY TOGGLE */

  //----------------------- Methods --------------------------------/

  ngAfterViewChecked(): void {
    this.usage.nativeElement.style.width = `${(this.currentUserPlan.countOfCapacity / this.currentUserPlan.storageCapacity) * 100}%`;
  }

  getHistory(pageSize = 5, pageNumber = 1) {
    this._PaymentService.listPaymentHistoryWithPagination(pageNumber, pageSize).subscribe({
      next: (res: PaymentHistoryResponse) => {
        this.bills = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  toggleChangePlan(plan?: any) {
    console.log(plan);

    if (!!!plan) {
      this._SettingService.setChangePlan();
      this.differentSelectedPlan = null;
      return;
    }
    this.selectedPlan = null;
    this.differentSelectedPlan = plan;
    sessionStorage.setItem("price", plan.price);

    console.log(this.differentSelectedPlan);

    if (plan.id != 1) {
      this._SettingService.setChangePlan();
      if (this.changePlan && plan.id) {
        this.subscriptionPlanId = plan.id;
        this.subscriptionPlanPrice = plan.price;
      } else {
        this.subscriptionPlanId = 0;
      }
      if (this.changePlan) {
        this.paymentType = 1;
        sessionStorage.setItem("paymentType", paymentType.stripe.toString());
        sessionStorage.setItem("paymentTypeName", 'Stripe');
      }
    } else {
      this.subscriptionPlanId = 1;
      this._PaymentService.createCheckoutSession(this.subscriptionPlanId).subscribe({
        next: (res) => {
          this._Router.navigate(['/cms/dashboard'])
        }
      });
    }
  }

  numberOfRows(event: { currentPage: number, currentRows: number }) {
    console.log(event);

    this.getHistory(event.currentRows, event.currentPage);
  }

  changePaymentMethod(paymentMethod: number) {
    if (paymentMethod == 1) {
      sessionStorage.setItem("paymentType", paymentType.stripe.toString());
      sessionStorage.setItem("paymentTypeName", 'Stripe');
    }
    else {
      sessionStorage.setItem("paymentType", paymentType.paypal.toString());
      sessionStorage.setItem("paymentTypeName", 'Paypal');
    }
  }

  switchSubscriptionPlan() {
    this._SettingService.setChangePlan(false);
    sessionStorage.setItem("price", this.selectedPlan ? this.selectedPlan.price.toString() : this.subscriptionPlanPrice.toString());

    if (sessionStorage.getItem("paymentType") === "1") {
      this._PaymentService.createCheckoutSession(this.selectedPlan ? this.selectedPlan.id : this.subscriptionPlanId).subscribe({
        next: (session) => {
          this.stripe.redirectToCheckout({
            sessionId: session.sessionId
          });
          sessionStorage.setItem("subscriptionId", this.selectedPlan ? this.selectedPlan.id.toString() : this.subscriptionPlanId.toString());
          sessionStorage.setItem("stripeSessionId", session.sessionId);
        }
      });
    } else {
      this._PaymentService.getPaypalApprovalLink(this.selectedPlan ? this.selectedPlan.id : this.subscriptionPlanId).subscribe({
        next: (res) => {
          sessionStorage.setItem("subscriptionId", this.selectedPlan ? this.selectedPlan.id.toString() : this.subscriptionPlanId.toString());
          const link = res.links[1].href;
          const customPaypalLink = document.createElement('a');
          customPaypalLink.setAttribute('href', link);
          customPaypalLink.click();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }

    this.selectedPlan = null;
  }

  togglePlans() {
    this.showPlansToUpgrade = !this.showPlansToUpgrade;
  }

  downloadRecipe(receiptId: number) {
    const link = document.createElement('a')
    link.setAttribute('type', 'hidden');
    link.setAttribute('target', '_blank');
    link.href = `/invoice-detail/${receiptId}`;
    document.body.appendChild(link);
    link.click();

    // this._Router.navigate([`/invoice-detail/${receiptId}`])
  }

  onSearch(event: any) {
    this._PaymentService.getPaymentHistory('description', event.target.value).subscribe({
      next: (res: any) => {
        this.bills = res;
        console.log(res);

      },
      error: () => {
        console.log("Error in search");

      }
    })

  }

  filterAddActive() {
    this.activeFilter = !this.activeFilter;
    this.activeFilter ? this.filterEl.nativeElement.classList.add('activeFilter') : this.filterEl.nativeElement.classList.remove('activeFilter');
  }

  filterClicked(value: any) { }

  ngOnDestroy(): void { }

}
