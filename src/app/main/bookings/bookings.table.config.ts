import {BookingLinkComponent} from "./bookings-table/booking-link/booking-link.component";
import {
		BookingSessionsRemainingComponent
} from "./bookings-table/booking-sessions-remaining/booking-sessions-remaining.component";
import {BookingOwnerComponent} from "./bookings-table/booking-owner/booking-owner.component";
import {environment} from "@env";
import {
		BookingsNextSessionComponent
} from "./bookings-table/bookings-next-session/bookings-next-session.component";

export const bookingsTableConfig: any = {
		bookingToken: {
				title: 'Booking ID',
				width: '178px',
				type: 'custom',
				renderComponent: BookingLinkComponent
		},
		title: {
				title: 'Title'
		},
		nextSessionStartEpoch: {
				title: 'Next session',
				type: 'custom',
				renderComponent: BookingsNextSessionComponent,
				width: '272px'
		},
		nextSessionDurationMins: {
				title: 'Duration',
				width: '150px',
				valuePrepareFunction: (data: number) => `${data} mins`
		},
		countFutureSessions: {
				title: 'Sessions Remaining',
				type: 'custom',
				renderComponent: BookingSessionsRemainingComponent,
				width: '200px'
		}
}

if (environment.role === 'admin') {
		bookingsTableConfig.ownerLastName = {
				title: 'Owner',
				type: 'custom',
				renderComponent: BookingOwnerComponent
		}
}
