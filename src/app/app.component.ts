import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from './components/Authentication/signup/signup.component';

import { ReactiveFormsModule } from '@angular/forms';
import { style, transition, trigger, group, query, animate, state } from '@angular/animations';
import { NavigationService } from './globalAnimation/navigation.service';
import { AuthService } from './components/Authentication/auth/auth.service';
import { LocalStorageKeys } from './keys/local-storage-keys';
import { ToastSystemComponent } from './shared/toasts/system/toast-system.component';
import { ToastService } from './services/toast/toast.service';
import { Toast, ToastType } from './interfaces/toast';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ToggleThemeService } from './services/toggleDarkTheme/toggle-theme.service';
import { ToggleDeleteModalService } from './services/toggleModal/toggle-delete-modal.service';
import { UserProfileComponent } from './components/core/user-profile/user-profile.component';
import { OutsideClickDirective } from './shared/directives/outside-click.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupComponent, ReactiveFormsModule, ToastSystemComponent, CommonModule, UserProfileComponent, OutsideClickDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.7s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.7s ease-in-out', style({ transform: 'translateX(-100%)' }))], { optional: true }),
        ])
      ]),
    ])
  ],
})
export class AppComponent implements OnInit {
  animationState = 'out';
  ToastValue!: Boolean;
  currentToast!: Toast;
  profileToggle: Boolean = false;
  constructor(private _DataTheme: ToggleThemeService,
    private navigationService: NavigationService,
    private _AuthService: AuthService,
    private _ToastService: ToastService,
    private _ToggleModal: ToggleDeleteModalService) {
    this.ToastValue = false;
  }

  ngOnInit(): void {

    this._ToggleModal.getToggleUserProfile().subscribe({
      next: (res) => {
        console.log('from app: ' + res);

        this.profileToggle = res;
      }
    })

    this._ToastService.getToast().subscribe({
      next: (toast) => {
        this.ToastValue = toast;
        if (this.ToastValue) {
          this.currentToast = this._ToastService.getCurrentToast();
        }
      }
    })

    if (localStorage.getItem(LocalStorageKeys.USER_SESSION)) {
      this._AuthService.setUserOnBootstrap(JSON.parse(localStorage.getItem(LocalStorageKeys.USER_SESSION) || ""));
    }
  }

  closeToast() {
    this._ToastService.toggleToast();
  }

  getState(outlet: any) {
    return this.navigationService.animationValue;
  }

  closingAnyMenu() {

  }

  title = 'cmsproject';
}
