import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShellRoutingModule} from './shell-routing.module';
import {ShellComponent} from './shell.component';
import {CoreModule} from "@core/core.module";

@NgModule({
    declarations: [
        ShellComponent,
    ],
    imports: [
        CommonModule,
        ShellRoutingModule,
        CoreModule
    ]
})
export class ShellModule {
}
