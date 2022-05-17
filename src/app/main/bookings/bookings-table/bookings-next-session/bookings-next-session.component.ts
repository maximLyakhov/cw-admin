import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IBookingSummary} from "@interfaces/booking.interfaces";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {AuthState} from "@store/auth.state";

@Component({
    selector: 'cwb-bookings-next-session',
    templateUrl: './bookings-next-session.component.html',
    styleUrls: ['./bookings-next-session.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingsNextSessionComponent implements ViewCell {
    @SelectSnapshot(AuthState.userTimeZone) userTimeZone!: string
    @Input() rowData!: IBookingSummary
    @Input() value!: number
}
