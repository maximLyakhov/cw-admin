import {IRegions, IUser, IUserSettings} from "@interfaces/user.interfaces";
import {ResponseType} from "@constants/response-type";
import {HttpStatusCode} from "@angular/common/http";

export class Login {
	static readonly type = '[User] Login'

	constructor(public payload: IUser) {}
}

export class Logout {
	static readonly type = '[User] Logout'

	constructor() {}
}

export class Relogin {
	static readonly type = '[User] Relogin'

	constructor() {}
}

export class GetUserSettings {
	static readonly type = '[User] Get Settings'

	constructor() {}
}

export class GetStripeClientSecretResponse {
	static readonly type = ResponseType.GetStripeClientSecretResponse

	constructor(
		public data: {stripeClientSecret: string}
	) {
	}
}

export class UpdateUserResponse {
	static readonly type = ResponseType.UpdateUserResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}

export class NewUserResponse {
	static readonly type = ResponseType.NewUserResponse

	constructor(
		public data: { loginToken: string; connectionId: string },
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {
	}
}

export class LogInResponse {
	static readonly type = ResponseType.LogInResponse

	constructor(
		public data: { loginToken: string; connectionId: string },
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {
	}
}

export class ReLogInResponse {
	static readonly type = ResponseType.ReLogInResponse

	constructor(
		public data: { loginToken: string; connectionId: string },
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {
	}
}

export class LogOutResponse {
	static readonly type = ResponseType.LogOutResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {
	}
}

export class GetUserSettingsResponse {
	static readonly type = ResponseType.GetUserSettingsResponse

	constructor(
		public data: IUserSettings,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {
	}
}

export class StartResetPasswordResponse {
	static readonly type = ResponseType.StartResetPasswordResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {
	}
}

export class CheckResetPasswordResponse {
	static readonly type = ResponseType.CheckResetPasswordResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {
	}
}

export class ChangePasswordResponse {
	static readonly type = ResponseType.ChangePasswordResponse

	constructor(
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {
	}
}

export class GetTimeZoneRegionsResponse {
	static readonly type = ResponseType.GetTimeZoneRegionsResponse

	constructor(
		public data: IRegions,
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {
	}
}

export class GetTimeZoneCitiesResponse {
	static readonly type = ResponseType.GetTimeZoneCitiesResponse

	constructor(
		public data: { cities: string[] },
		public code: HttpStatusCode,
		public p: number,
		public error?: string
	) {
	}
}
