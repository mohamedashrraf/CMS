import { Route } from "@angular/router";

export const MANAGEMENT_ROUTES: Route[] = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    {
        path: 'users',
        loadComponent: () => import('./manage-users/manage-users.component').then(c => c.ManageUsersComponent)
    },
    {
        path: 'roles',
        loadComponent: () => import('./manage-roles/manageroles.component').then(c => c.ManageRolesComponent)
    },
]