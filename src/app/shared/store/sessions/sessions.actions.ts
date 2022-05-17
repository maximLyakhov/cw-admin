import {HttpStatusCode} from "@angular/common/http";
import {IAdminSession} from "@interfaces/session.interfaces";
import {ResponseType} from "@constants/response-type";

export class GetSessionsSummaryResponse {
	static readonly type = ResponseType.GetSessionsSummaryResponse

	constructor(
		public data: { sessions: IAdminSession[] },
		public code: HttpStatusCode,
		public p: number,
		public error: string
	) {
	}
}
