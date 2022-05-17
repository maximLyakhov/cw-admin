import {Injectable} from '@angular/core'
import {MessageType} from '@constants/message-types'
import {Navigate} from '@ngxs/router-plugin'
import {Action, Actions, ofActionSuccessful, Selector, State, StateContext} from '@ngxs/store'
import {
	ChangePasswordResponse,
	CheckResetPasswordResponse,
	GetStripeClientSecretResponse,
	GetUserSettings,
	GetUserSettingsResponse,
	Login,
	LogInResponse,
	Logout,
	LogOutResponse,
	NewUserResponse,
	Relogin,
	ReLogInResponse,
	StartResetPasswordResponse,
	UpdateUserResponse
} from './auth.actions'
import {Send} from '@store/websocket.send.actions'
import {Observable, of} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import {IUserSettings} from "@interfaces/user.interfaces";
import {ErrorHandlerService} from "@services/error-handler.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationService} from "@services/confirmation.service";

export interface AuthStateModel {
	logged?: boolean
	anonymous?: boolean
	loginToken?: string
	userInfo?: IUserSettings
	requestedPasscode?: boolean
	stripeClientSecret?: string
}

const freshUser = {
	logged: false,
	anonymous: false,
	userInfo: undefined
}

@State<AuthStateModel>({name: 'user', defaults: freshUser})
@Injectable()
export class AuthState {
	constructor(
		private error: ErrorHandlerService,
		private actions: Actions,
		private snack: MatSnackBar,
		private confirmation: ConfirmationService
	) {
	}

	@Selector()
	public static userId(state: AuthStateModel) {
		return state.userInfo?.userId
	}

	@Selector()
	public static userInfo(state: AuthStateModel) {
		return state.userInfo
	}

	@Selector()
	public static userTimeZone(state: AuthStateModel) {
		return state.userInfo?.timeZone
	}

	@Selector()
	public static anonymous(state: AuthStateModel) {
		return state.anonymous
	}

	@Selector()
	public static requestedPasscode(state: AuthStateModel): boolean | undefined {
		return state.requestedPasscode
	}

	@Selector()
	public static token(state: AuthStateModel) {
		return state.loginToken
	}

	@Selector()
	public static logged(state: AuthStateModel) {
		return state.logged
	}

	@Selector()
	public static stripeClientSecret(state: AuthStateModel) {
		return state.stripeClientSecret
	}

	@Action(NewUserResponse)
	private newUser(
		{dispatch, patchState, getState, setState}: StateContext<AuthStateModel>,
		{data, code, error}: NewUserResponse
	) {
		if (code === 200) {
			dispatch(new GetUserSettings())
			dispatch(new Navigate(['/']))

			return patchState({...data})
		} else {
			setState({...getState(), ...freshUser, loginToken: undefined})

			this.snack.open(error!)
			return getState()
		}
	}

	@Action(Login)
	private login(
		{dispatch}: StateContext<AuthStateModel>,
		{payload}: Login
	): Observable<void> {
		return dispatch(new Send({type: MessageType.LogIn, data: {...payload}}))
	}

	@Action(LogInResponse)
	private logInResponse(
		{getState, setState, dispatch}: StateContext<AuthStateModel>,
		{data, code, error}: LogInResponse
	): AuthStateModel {
		if (code !== 200) {
			this.snack.open(error!)
			return getState()
		}
		dispatch(new GetUserSettings())

		return setState({...getState(), ...data})
	}

	@Action(GetUserSettings)
	private getUserSettings(
		{dispatch}: StateContext<AuthStateModel>
	): Observable<AuthStateModel> {
		return dispatch(new Send({type: MessageType.GetUserSettings})).pipe(
			switchMap(() =>
				this.actions.pipe(ofActionSuccessful(GetUserSettingsResponse))
			)
		)
	}

	@Action(GetUserSettingsResponse)
	private getUserSettingsResponse(
		{getState, setState}: StateContext<AuthStateModel>,
		{data}: GetUserSettingsResponse
	): AuthStateModel {
		return setState({...getState(), userInfo: data, logged: true})
	}

	@Action(Relogin)
	private relogin(
		{getState, dispatch, setState}: StateContext<AuthStateModel>
	) {
		const {loginToken, logged} = getState()

		if (loginToken) {
			return dispatch(
				new Send({type: MessageType.ReLogIn, data: {loginToken}})
			)
		}

		if (logged) {
			return getState()
		}

		return of(setState({...getState()})).pipe(
			switchMap(() => dispatch(new Navigate(['/'])))
		)
	}

	@Action(ReLogInResponse)
	private reloginResponse(
		{getState, setState, dispatch}: StateContext<AuthStateModel>,
		{data, code, error}: ReLogInResponse
	) {
		if (code === 200) {
			setState({...getState(), ...data, logged: true})

			return dispatch(new GetUserSettings())
		} else {
			setState({...getState(), ...freshUser, loginToken: undefined})

			this.snack.open(error!)

			return dispatch(new Navigate(['/']))
		}
	}

	@Action(UpdateUserResponse)
	private updateUserResponse(
		{dispatch}: StateContext<AuthStateModel>,
		{code, error}: UpdateUserResponse
	) {
		return code === 200
			? dispatch(new GetUserSettings())
			: this.snack.open(error)
	}

	@Action(Logout)
	private logout({dispatch}: StateContext<AuthStateModel>) {
		return dispatch(new Send({type: MessageType.LogOut}))
	}

	@Action(LogOutResponse)
	private logOutResponse(
		{getState, setState, dispatch}: StateContext<AuthStateModel>
	) {
		setState({...getState(), ...freshUser, loginToken: undefined})
		return dispatch(new Navigate(['']))
	}

	@Action(StartResetPasswordResponse)
	private startResetPasswordResponse(
		{}: StateContext<AuthStateModel>,
		{code, error}: StartResetPasswordResponse
	) {
		this.confirmation.open$(
			code === 200
				? 'We have sent you a password reset link, please check your email inbox'
				: error || 'Something gone wrong...',
			'Ok'
		).then()
	}

	@Action(CheckResetPasswordResponse)
	private checkResetPasswordResponse(
		{}: StateContext<AuthStateModel>,
		{code, error}: CheckResetPasswordResponse
	) {
		if (code !== 200 && error) {
			this.snack.open(error)
		}
	}

	@Action(ChangePasswordResponse)
	private changePasswordResponse(
		{dispatch}: StateContext<AuthStateModel>,
		{code, error}: ChangePasswordResponse
	) {
		if (code !== 200 && error) {
			return this.snack.open(error)
		}
		return dispatch(new Navigate(['/']))
	}

	@Action(GetStripeClientSecretResponse)
	private getStripeClientSecretResponse(
		{patchState}: StateContext<AuthStateModel>,
		{data}: GetStripeClientSecretResponse
	) {
		return patchState({stripeClientSecret: data.stripeClientSecret})
	}
}
