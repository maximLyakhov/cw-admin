import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {ChangePasswordGuard} from './shell/change-password/change-password.guard'
import {AuthGuard} from "./auth.guard"

export const routesNoAuth: Routes = [
    {
        path: '',
        loadChildren: () => import('./shell/shell.module').then(m => m.ShellModule)
    }
]

export const routesAuth: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routesNoAuth)],
    exports: [RouterModule],
    providers: [ChangePasswordGuard]
})
export class AppRoutingModule {
}
