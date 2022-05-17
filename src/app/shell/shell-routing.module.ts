import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShellComponent} from "./shell.component";
import {ChangePasswordGuard} from "./change-password/change-password.guard";

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./login/login.module')
                    .then(m => m.LoginModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('./password-reset/password-reset.module')
                    .then(m => m.PasswordResetModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('./create-user/create-user.module')
                    .then(m => m.CreateUserModule)
            },
            {
                path: 'passwordreset',
                loadChildren: () => import('./change-password/change-password.module')
                    .then(m => m.ChangePasswordModule),
                canActivate: [ChangePasswordGuard]
            },
            {
                path: '**',
                redirectTo: ''
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellRoutingModule {
}
