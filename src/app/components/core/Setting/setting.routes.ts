import { Route } from "@angular/router";


export const SETTING_ROUTES: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: '/cms/setting/subscription' },
    {
        path: 'subscription',
        loadComponent: () => import('./components/subscription/subscription.component').then(c => c.SubscriptionComponent)
    },
    {
        path: 'notification',
        loadComponent: () => import('./components/notification/notification.component').then(c => c.NotificationComponent)
    },
]