import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
    ClearCaptionLogs,
    ClearSessionViewerLogs,
    GetCaptionLogsResponse,
    GetSessionViewerLogsResponse
} from "./admin-logs.actions";
import {ISessionCaptionLogs, ISessionViewerLog} from "@interfaces/session.interfaces";

export interface AdminLogsStateModel {
    viewerLogs: ISessionViewerLog[]
    captionLogs: ISessionCaptionLogs[]
}

const defaults = {
    viewerLogs: [],
    captionLogs: []
}

@Injectable()
@State<AdminLogsStateModel>({name: 'adminlogs', defaults})
export class AdminLogsState {
    @Selector()
    public static viewerLogs(state: AdminLogsStateModel) {
        return state.viewerLogs
    }

    @Selector()
    public static captionLogs(state: AdminLogsStateModel) {
        return state.captionLogs
    }

    @Action(GetSessionViewerLogsResponse)
    private getSessionViewerLogsResponse({patchState}: StateContext<AdminLogsStateModel>, {data}: GetSessionViewerLogsResponse) {
        return patchState({viewerLogs: data.logs})
    }

    @Action(ClearSessionViewerLogs)
    private clearSessionViewerLogs({patchState}: StateContext<AdminLogsStateModel>,) {
        return patchState({viewerLogs: []})
    }

    @Action(GetCaptionLogsResponse)
    private getCaptionLogsResponse({patchState}: StateContext<AdminLogsStateModel>, {data}: GetCaptionLogsResponse) {
        return patchState({captionLogs: data.logs})
    }

    @Action(ClearCaptionLogs)
    private clearCaptionLogs({patchState}: StateContext<AdminLogsStateModel>,) {
        return patchState({captionLogs: []})
    }
}
