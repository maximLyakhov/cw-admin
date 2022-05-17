import {NgModule} from '@angular/core';
import {AccountSettingsRoutingModule} from './account-settings-routing.module';
import {AccountSettingsPageComponent} from './account-settings-page.component';
import {UserSettingsComponent} from './general-settings/user-settings.component';
import {PaymentComponent} from './payment/payment.component';
import {SvgIconModule} from "@core/svg-icon/svg-icon.module";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "@core/input/input.module";
import {TimezoneSelectorModule} from "@core/timezone-selector/timezone-selector.module";
import {SmallButtonModule} from "@core/small-button/small-button.module";
import {LoaderModule} from "@cmp/loader/loader.module";
import {LayoutsModule} from "@core/layouts/layouts.module";

@NgModule({
    declarations: [
        AccountSettingsPageComponent,
        UserSettingsComponent,
        PaymentComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LayoutsModule,
        InputModule,
        TimezoneSelectorModule,
        SmallButtonModule,
        LoaderModule,
        SvgIconModule,
        AccountSettingsRoutingModule
    ]
})
export class AccountSettingsModule {
}
