import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AdminGuard} from './admin.guard';
import {UserGuard} from '../shell/create-user/user.guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'bookings',
                loadChildren: () => import('./bookings/bookings.module')
                    .then(m => m.BookingsModule)
            },
            {
                path: 'sessions',
                loadChildren: () => import('./sessions/sessions.module')
                    .then(m => m.SessionsModule),
                canLoad: [AdminGuard]
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module')
                    .then(m => m.UsersModule),
                canLoad: [AdminGuard]
            },
            {
                path: 'billings',
                loadChildren: () => import('./billing/billing.module')
                    .then(m => m.BillingModule),
                canLoad: [AdminGuard]
            },
            {
                path: 'account-settings',
                loadChildren: () => import('./account-settings/account-settings.module')
                    .then(m => m.AccountSettingsModule),
                canLoad: [UserGuard]
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'bookings',
                loadChildren: () => import('./bookings/bookings.module')
                    .then(m => m.BookingsModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
