import {ResponseType} from "@constants/response-type";
import {ISessionCaptionLogs, ISessionViewerLog} from "@interfaces/session.interfaces";
import {HttpStatusCode} from "@angular/common/http";

export class GetSessionViewerLogsResponse {
    static readonly type = ResponseType.GetSessionViewerLogsResponse

    constructor(
        public data: {logs: ISessionViewerLog[]},
        public code: HttpStatusCode,
        public p: number,
        public error: string
    ) {
    }
}

export class ClearSessionViewerLogs {
    static readonly type = '[Session] Clear Viewer Logs'
}

export class GetCaptionLogsResponse {
    static readonly type = ResponseType.GetSessionCaptionLogsResponse

    constructor(
        public data: {logs: ISessionCaptionLogs[]},
        public code: HttpStatusCode,
        public p: number,
        public error: string
    ) {
    }
}

export class ClearCaptionLogs {
    static readonly type = '[Session] Clear Caption Logs'
}
