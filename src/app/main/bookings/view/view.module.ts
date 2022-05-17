import {NgModule} from '@angular/core';
import {ViewRoutingModule} from './view-routing.module';
import {ViewBookingPageComponent} from './view-booking-page.component';
import {BookingComponent} from './booking/booking.component';
import {SessionsComponent} from './sessions/sessions.component';
import {ShareBookingLinkComponent} from './booking/share-booking-link/share-booking-link.component';
import {CityPipe} from "./booking/pipes/city.pipe";
import {RegionPipe} from "./booking/pipes/region.pipe";
import {TimezonePipe} from "./booking/pipes/timezone.pipe";
import {CommonModule} from "@angular/common";
import {BadgeModule} from "@cmp/badge/badge.module";
import {SvgIconModule} from "@core/svg-icon/svg-icon.module";
import {LayoutsModule} from "@core/layouts/layouts.module";
import {SmallButtonModule} from "@core/small-button/small-button.module";
import {PipesModule} from "@pipes/pipes.module";

@NgModule({
    declarations: [
        ViewBookingPageComponent,
        BookingComponent,
        SessionsComponent,
        ShareBookingLinkComponent,
        //
        CityPipe,
        RegionPipe,
        TimezonePipe
    ],
    imports: [
        LayoutsModule,
        PipesModule,
        SmallButtonModule,
        CommonModule,
        ViewRoutingModule,
        BadgeModule,
        SvgIconModule
    ]
})
export class ViewModule {
}
