import { Routes } from '@angular/router';

import { SigninComponent } from './components/Authentication/signin/signin.component';
import { SignupComponent } from './components/Authentication/signup/signup.component';
import { SendmailComponent } from './components/Authentication/sendmail/sendmail.component';
import { EmailVerificationComponent } from './components/Authentication/email-verification/email-verification.component';
import { SetnewpasswordComponent } from './components/Authentication/setnewpassword/setnewpassword.component';
import { CorrectchagesComponent } from './components/Authentication/correctchages/correctchages.component';
import { SignupverificationComponent } from './components/Authentication/signupverification/signupverification.component';
import { CmsMainComponent } from './components/core/cms-main/cms-main.component';
import { authGuard } from './guards/auth.guard';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { SettingComponent } from './components/core/Setting/setting.component';
import { SubscriptionPlanComponent } from './shared/subscription-plan/subscription-plan.component';
import { SuccessPaymentComponent } from './shared/success-payment/success-payment.component';
import { paymentGuard } from './guards/payment.guard';
import { InternalServerErrorComponent } from './components/core/internal-server-error/internal-server-error.component';
import { FailedPaymentComponent } from './shared/failed-payment/failed-payment.component';
import { LateUserPaymentComponent } from './components/Authentication/late-user-payment/late-user-payment.component';
import { FilterComponent } from './shared/filter/filter.component';
import { InvoiceDetailsComponent } from './components/core/Setting/components/invoice-details/invoice-details.component';
import { BlogComponent } from './components/core/blog/blog.component';
// import { UserProfileComponent } from './components/core/user-profile/user-profile.component';



export const routes: Routes = [
  { path: '', redirectTo: '/auth/signup', pathMatch: 'full' },
  {
    path: 'auth', canActivate: [isLoggedInGuard], children: [
      { path: 'signin', component: SigninComponent, data: { num: 1 } },
      { path: 'signup', component: SignupComponent, data: { num: 2 } },
      { path: 'sendmail', component: SendmailComponent, data: { num: 3 } },
      { path: 'signupverification', component: SignupverificationComponent },
      { path: 'setnewpassword', component: SetnewpasswordComponent },
      { path: 'correctchange', component: CorrectchagesComponent }
    ]
  },
  { path: 'auth/emailverification', component: EmailVerificationComponent },
  {
    path: 'cms',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./components/core/dashboard/dashboard.component').then(c => c.DashboardComponent) },
      {
        path: 'blogs',
        loadComponent: () => import('./components/core/blog/blog.component').then(c => c.BlogComponent)
      },
      { path: 'media', loadComponent: () => import('./components/core/media/media.component').then(c => c.MediaComponent) },
      { path: 'seo-support', loadComponent: () => import('./components/core/seo-support/seo-support.component').then(c => c.SeoSupportComponent) },
      { path: 'report-analytics', loadComponent: () => import('./components/core/reports-analytics/reports-analytics.component').then(c => c.ReportsAnalyticsComponent) },
      { path: 'comments', loadComponent: () => import('./components/core/comments/comments.component').then(c => c.CommentsComponent) },
      // { path: 'profile', component: UserProfileComponent, loadComponent: () => import('./components/core/user-profile/user-profile.component').then(c => c.UserProfileComponent) },
      {
        path: 'management',
        loadChildren: () => import('./components/core/management/management.routes').then(routes => routes.MANAGEMENT_ROUTES),
      },
      {
        path: 'setting',
        component: SettingComponent,
        loadChildren: () => import('./components/core/Setting/setting.routes').then(routes => routes.SETTING_ROUTES)
      },
      { path: 'help', loadComponent: () => import('./components/core/help-center/help-center.component').then(c => c.HelpCenterComponent) },
    ],
    component: CmsMainComponent,
  },
  { path: 'plan', component: SubscriptionPlanComponent },
  { path: 'ise', component: InternalServerErrorComponent },
  { path: 'recharge-payment', component: LateUserPaymentComponent },
  {
    path: 'payment',
    canActivate: [paymentGuard],
    children: [
      { path: 'success', component: SuccessPaymentComponent },
      { path: 'failed', component: FailedPaymentComponent },
    ]
  },
  { path: 'filter', component: FilterComponent },
  { path: 'invoice-detail/:billId', component: InvoiceDetailsComponent },
  { path: '**', loadComponent: () => import('./components/core/notfound/notfound.component').then(c => c.NotfoundComponent) },
];
