import { CommonModule, LocationStrategy, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet, Router } from '@angular/router';


import { BreadcrumbService } from '../../services/breadcrumb/breadcrumb.service';
import { UserProfileComponent } from '../../components/core/user-profile/user-profile.component';
import { CardModalComponent } from '../pop-up-card/card-modal/card-modal.component';
import { AuthService } from '../../components/Authentication/auth/auth.service';
import { AppUser } from '../../interfaces/app-user';
import { ToggleService } from '../../services/toggleBtn/toggle.service';
import { ToastService } from '../../services/toast/toast.service';
import { Toast, ToastType } from '../../interfaces/toast';
import { title } from 'process';
import { SettingsService } from '../../components/core/Setting/services/settings.service';
import { PaymentService } from '../../components/core/Setting/services/payment.service';
import { OutsideClickDirective } from '../directives/outside-click.directive';
import { ToggleDeleteModalService } from '../../services/toggleModal/toggle-delete-modal.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TitleCasePipe,
    UpperCasePipe,
    UserProfileComponent,
    RouterOutlet,
    RouterModule,
    RouterLink,
    FormsModule,
    CardModalComponent,
    OutsideClickDirective,
    CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  notification_status!: Boolean
  toggleUserMenu!: Boolean
  toggleSubscriptionMenu!: Boolean
  user!: AppUser;
  fullPath!: string[];
  sidebarToggler!: Boolean;
  subscriptionPlanId!: number;
  currentPlan!: any;
  changePlan!: Boolean;


  constructor(private _BreadCurmb: BreadcrumbService,
    private _AuthService: AuthService,
    private _SettingService: SettingsService,
    private _ToastService: ToastService,
    private _PaymentService: PaymentService,
    private _Router: Router,
    private _Toggle: ToggleService,
    private _Profile: ToggleDeleteModalService) {
    this.notification_status = false;
    this.toggleUserMenu = false;
    this.toggleSubscriptionMenu = false;
    this.sidebarToggler = false;
  }

  ngOnInit(): void {
    this._SettingService.getChangePlan().subscribe({
      next: (val) => {
        this.changePlan = val;
      }
    })

    this._SettingService.getYourPlan().subscribe({
      next: (res) => { this.currentPlan = res; },
      error: (err) => {
        console.log(err);
      }
    })

    this._AuthService.getUser().subscribe({
      next: (usr) => {
        this.user = usr
      },
      error: (usrError) => {
        console.log(usrError);
      }
    })
    this._BreadCurmb.changeCurrentPath();
    this._BreadCurmb.getCurrentPath().subscribe({
      next: (res: string[]) => {
        this.fullPath = res.splice(1);
      }
    })
  }

  togglesidebar() {
    this._Toggle.toggle();
    this.sidebarToggler = !this.sidebarToggler;
    this.toggleUserMenu = false;
  }

  search(event: any) {
    if (event.target.value > 3)
      console.log(event.target.value);
  }

  userMenuToggled() {
    this.toggleUserMenu = !this.toggleUserMenu;
    this.toggleSubscriptionMenu = false;
    
  }

  subscriptionMenuToggled() {
    this.toggleSubscriptionMenu = !this.toggleSubscriptionMenu;
    this.toggleUserMenu = false;
  }

  showToast() {
    this._ToastService.addToast(new Toast(ToastType.System, 'title', 'body', 3000));
    this._ToastService.toggleToast();
  }

  logout() {
    this._AuthService.logout();
  }

  onCancelSubscription() {
    this.toggleSubscriptionMenu = false;
    this._SettingService.cancelSubscriptionPlan().subscribe({
      next: (res) => {
        this._ToastService.addToast({ type: ToastType.Success, title: 'Success', message: res.message, duration: 3000 })
        this._Router.navigate(['/cms/dashboard']);
      },
      error: (err) => {
        this._ToastService.addToast({ type: ToastType.Failed, title: 'Error', message: err.error.message, duration: 3000 })
      }
    })
  }

  renewOrChangePlan() {
    this.toggleSubscriptionMenu = false;
    console.log(this.currentPlan.id);
    if (this.currentPlan.id == 1) {
      this._ToastService.addToast({ type: ToastType.System, title: "Info", message: "Free plan doesn\'t have a renewal.", duration: 4000 });
      return;
    } else {
      this._SettingService.setChangePlan();
      this._SettingService.getYourPlan().subscribe({
        next: (res) => {
          this._SettingService.setUserCurrentPlan(res);
        },
        error: (err) => {
          console.log(err);
          this._ToastService.addToast({ type: ToastType.Failed, title: 'Error', message: err.error.message, duration: 3000 })
        }
      })
    }
  }

  toggleUserProfile() {
    this._Profile.toggleUserProfile();
  }
}
