import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {
	AddSessionResponse,
	CancelSessionResponse,
	CreateBookingResponse,
	GetBookingsResponse,
	GetBookingSummaryResponse,
	UpdateBookingResponse, UpdateSessionResponse
} from "./bookings.actions";
import {IBooking, IBookingSummary} from "@interfaces/booking.interfaces";
import {TSessionStatus} from "@interfaces/session.interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Navigate} from "@ngxs/router-plugin";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

export interface BookingStateModel {
	bookings: IBookingSummary[]
	booking: IBooking
}

@Injectable()
@State<null>({name: 'bookings'})
export class BookingsState {
	constructor(private snack: MatSnackBar) {
	}

	@Selector()
	public static bookings(state: BookingStateModel) {
		return state.bookings || []
	}

	@Selector()
	public static booking(state: BookingStateModel) {
		return state.booking
	}

	@Selector()
	public static bookingSessions(state: BookingStateModel) {
		return state.booking.sessions
	}

	@Action(GetBookingSummaryResponse)
	private getBookingSummaryResponse(
		{patchState}: StateContext<BookingStateModel>,
		{data, code, error}: GetBookingSummaryResponse
	) {
		return code === 200
			? patchState({bookings: data.bookings.reverse()})
			: this.snack.open(error)
	}

	@Action(GetBookingsResponse)
	private getBookingsResponse(
		{patchState}: StateContext<BookingStateModel>,
		{data}: GetBookingsResponse
	) {
		return patchState({booking: data.bookings.shift()})
	}

	@Action(CancelSessionResponse)
	private cancelSessionResponse(
		{patchState, getState}: StateContext<BookingStateModel>,
		{data}: CancelSessionResponse
	) {
		const sessions = getState().booking.sessions

		const updatedSessions = sessions.map(session => {
			if (session.sessionId === Number(data.sessionId)) {
				return {...session, status: TSessionStatus.Cancelled}
			}
			return session
		})

		return patchState({
			booking: {
				...getState().booking,
				sessions: updatedSessions
			}
		})
	}

	@Action(CreateBookingResponse)
	private createBookingResponse(
		{dispatch}: StateContext<BookingStateModel>,
		{code, error}: CreateBookingResponse
	) {
		return code === 200
			? dispatch([
				new Send({type: MessageType.GetBookingSummary}),
				new Navigate(['/'])
			])
			: this.snack.open(error)
	}

	@Action(UpdateBookingResponse)
	private updateBookingResponse(
		{dispatch}: StateContext<BookingStateModel>,
		{code, data, error}: UpdateBookingResponse
	) {
		return code === 200
			? dispatch(new Send({
				type: MessageType.GetBookings,
				data: {bookingToken: data.bookingToken}
			}))
			: this.snack.open(error)
	}

	@Action(AddSessionResponse)
	private addSessionResponse(
		{dispatch, getState}: StateContext<BookingStateModel>,
		{code, error}: AddSessionResponse
	) {
		return code === 200
			? dispatch(new Send({
				type: MessageType.GetBookings,
				data: {bookingToken: getState().booking.bookingToken}
			}))
			: this.snack.open(error)
	}

	@Action(UpdateSessionResponse)
	private updateSessionResponse(
		{dispatch, getState}: StateContext<BookingStateModel>,
		{code, error}: UpdateSessionResponse
	) {
		return code === 200
			? dispatch(new Send({
				type: MessageType.GetBookings,
				data: {bookingToken: getState().booking.bookingToken}
			}))
			: this.snack.open(error)
	}
}
