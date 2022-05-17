import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BillingRoutingModule} from './billing-routing.module';
import {BillingComponent} from './billing.component';
import {BillingViewComponent} from './billing-view/billing-view.component';
import {BillingStatusComponent} from './billings-table/billing-status/billing-status.component';
import {SmartTableModule} from "@cmp/smart-table/smart-table.module";
import {LayoutsModule} from "@core/layouts/layouts.module";
import {SvgIconModule} from "@core/svg-icon/svg-icon.module";

@NgModule({
    declarations: [
        BillingComponent,
        BillingViewComponent,
        BillingStatusComponent,
    ],
    imports: [
        CommonModule,
        BillingRoutingModule,
        SmartTableModule,
        LayoutsModule,
        SvgIconModule
    ]
})
export class BillingModule {
}
