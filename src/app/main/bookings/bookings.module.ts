import {NgModule} from '@angular/core';
import {BookingsRoutingModule} from './bookings-routing.module';
import {BookingsPageComponent} from './bookings-page.component';
import {BookingLinkComponent} from './bookings-table/booking-link/booking-link.component';
import {
		BookingSessionsRemainingComponent
} from './bookings-table/booking-sessions-remaining/booking-sessions-remaining.component';
import {BookingOwnerComponent} from './bookings-table/booking-owner/booking-owner.component';
import {SmartTableModule} from "@cmp/smart-table/smart-table.module";
import {LayoutsModule} from "@core/layouts/layouts.module";
import {ButtonModule} from "@core/button/button.module";
import {SvgIconModule} from "@core/svg-icon/svg-icon.module";
import {CommonModule} from "@angular/common";
import {PipesModule} from "@pipes/pipes.module";
import {
		BookingsNextSessionComponent
} from './bookings-table/bookings-next-session/bookings-next-session.component';

@NgModule({
		declarations: [
				BookingsPageComponent,
				BookingLinkComponent,
				BookingSessionsRemainingComponent,
				BookingOwnerComponent,
				BookingsNextSessionComponent
		],
		imports: [
				CommonModule,
				PipesModule,
				BookingsRoutingModule,
				SmartTableModule,
				LayoutsModule,
				ButtonModule,
				SvgIconModule
		]
})
export class BookingsModule {
}
