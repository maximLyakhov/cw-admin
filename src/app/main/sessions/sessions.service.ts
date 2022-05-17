import {Injectable} from '@angular/core';
import {from, Observable, of, switchMap, take, tap} from 'rxjs';
import {SessionDialogComponent} from './dialogs/session-dialog/session-dialog.component';
import {filter} from 'rxjs/operators';
import {ConfirmationService} from '@services/confirmation.service';
import {IAdminSession, ICreateSession, ISession} from "@interfaces/session.interfaces";
import {DialogService} from "@services/dialog.service";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";
import {
	SessionViewerLogsDialogComponent
} from "./dialogs/session-viewer-logs-dialog/session-viewer-logs-dialog.component";
import {
	SessionCaptionDialogComponent
} from "./dialogs/session-caption-dialog/session-caption-dialog.component";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {BookingsState} from "@store/bookings.state";
import {IBooking} from "@interfaces/booking.interfaces";
import {ClearCaptionLogs, ClearSessionViewerLogs} from "@store/admin-logs.actions";

@Injectable({providedIn: 'root'})
export class SessionsService {
	@SelectSnapshot(BookingsState.booking) booking!: IBooking

	constructor(
		private dialog: DialogService,
		private confirmationService: ConfirmationService,
	) {
	}

	public add$() {
		return this.dialog
			.open(SessionDialogComponent)
			.afterClosed()
			.pipe(
				filter(Boolean),
				switchMap((data) => of(this.addSession$({
					...data,
					bookingToken: this.booking.bookingToken
				})))
			)
	}

	public edit$(sessionData: ISession | IAdminSession): Observable<unknown> {
		return this.dialog
			.open(SessionDialogComponent, {data: sessionData})
			.afterClosed()
			.pipe(
				filter(Boolean),
				switchMap((session: ISession | IAdminSession) => of(this.updateSession$(session))),
			)
	}

	public cancel$(id: number) {
		from(this.confirmationService.open$('Are you sure you want to cancel the session?', 'Yes', 'No'))
			.pipe(
				take(1),
				filter(Boolean),
				tap(() => this.cancelSession$(id))
			)
			.subscribe()
	}

	@Dispatch()
	public getSessionsSummary$(fromEpoch?: number, toEpoch?: number) {
		return new Send({
			type: MessageType.GetSessionsSummary,
			data: {fromEpoch, toEpoch}
		})
	}

	@Dispatch()
	public getSessionViewerLogs$(sessionId: number) {
		this.dialog.open(SessionViewerLogsDialogComponent)
		return [
			new ClearSessionViewerLogs(),
			new Send({
				type: MessageType.GetSessionViewerLogs,
				data: {sessionId}
			})
		]
	}

	@Dispatch()
	public getSessionCaptionLogs$(sessionId: number) {
		this.dialog.open(SessionCaptionDialogComponent)
		return [
			new ClearCaptionLogs(),
			new Send({
				type: MessageType.GetSessionCaptionLogs,
				data: {sessionId}
			})
		]
	}

	@Dispatch()
	public addSession$(session: ICreateSession) {
		return new Send({
			type: MessageType.AddSession,
			data: session
		})
	}

	@Dispatch()
	private updateSession$(session: ISession | IAdminSession) {
		return new Send({
			type: MessageType.UpdateSession,
			data: session
		})
	}

	@Dispatch()
	private cancelSession$(sessionId: number) {
		return new Send({
			type: MessageType.CancelSession,
			data: {sessionId}
		})
	}
}
