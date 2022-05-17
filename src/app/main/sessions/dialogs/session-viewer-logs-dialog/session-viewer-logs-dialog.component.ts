import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DialogRef} from "@services/dialog.service";
import {Observable} from "rxjs";
import {Select} from "@ngxs/store";
import {ISessionViewerLog} from "@interfaces/session.interfaces";
import {AdminLogsState} from "@store/admin-logs.state";

@Component({
    selector: 'cwb-session-viewer-logs-dialog',
    templateUrl: './session-viewer-logs-dialog.component.html',
    styleUrls: ['./session-viewer-logs-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionViewerLogsDialogComponent {
    @Select(AdminLogsState.viewerLogs)
    public sessionViewerLogs$!: Observable<ISessionViewerLog[]>

    constructor(private dialogRef: DialogRef) {
    }

    close = () => this.dialogRef.close()
}
