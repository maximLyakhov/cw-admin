import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {IAdminSession, IAdminSessionRow, TSessionStatus} from "@interfaces/session.interfaces";
import {GetSessionsSummaryResponse} from "@store/sessions.actions";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CancelSessionResponse, UpdateSessionResponse} from "@store/bookings.actions";
import {IRangePicker} from "@cmp/range-picker/range-picker.component";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

export interface SessionsStateModel {
	sessions: IAdminSession[]
}

@Injectable()
@State<SessionsStateModel>({name: 'sessions', defaults: {sessions: []}})
export class SessionsState {
	constructor(private snack: MatSnackBar) {
	}

	@Selector()
	public static sessions(state: SessionsStateModel): IAdminSessionRow[] {
		return state.sessions.map((session) => ({
			...session,
			owner: `${session.ownerEmail}\n${session.ownerFirstName} ${session.ownerLastName}`
		}) as IAdminSessionRow)
	}

	@Action(GetSessionsSummaryResponse)
	private getSessionsSummaryResponse(
		{patchState}: StateContext<SessionsStateModel>,
		{data, code, error}: GetSessionsSummaryResponse
	) {
		return code === 200
			? patchState({sessions: data.sessions})
			: this.snack.open(error)
	}

	@Action(UpdateSessionResponse)
	private updateSessionResponse(
		{dispatch, getState}: StateContext<SessionsStateModel>,
		{code}: CancelSessionResponse
	) {
		const key = localStorage.getItem('range')
		if (key && code === 200) {
			const range: IRangePicker = JSON.parse(key)

			return dispatch(new Send({
				type: MessageType.GetSessionsSummary,
				data: {
					fromEpoch: Number(new Date(range.startDate)),
					toEpoch: Number(new Date(range.endDate))
				}
			}))
		}
		return getState()
	}

	@Action(CancelSessionResponse)
	private cancelSessionResponse(
		{patchState, getState}: StateContext<SessionsStateModel>,
		{data, code, error}: CancelSessionResponse
	) {
		if (code === 200) {
			const sessions = getState().sessions

			return patchState({
				sessions: sessions.map(session => {
					if (session.sessionId === Number(data.sessionId)) {
						return {...session, status: TSessionStatus.Cancelled}
					}
					return session
				})
			})
		} else {
			return this.snack.open(error)
		}
	}
}
