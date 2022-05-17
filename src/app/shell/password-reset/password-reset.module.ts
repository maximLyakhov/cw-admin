import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordResetRoutingModule} from './password-reset-routing.module';
import {PasswordResetPageComponent} from './password-reset-page.component';
import {CoreModule} from "@core/core.module";

@NgModule({
  declarations: [
    PasswordResetPageComponent
  ],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    CoreModule
  ]
})
export class PasswordResetModule {
}
