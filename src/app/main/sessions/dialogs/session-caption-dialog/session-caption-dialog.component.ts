import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DialogRef} from "@services/dialog.service";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {ISessionCaptionLogs} from "@interfaces/session.interfaces";
import {AdminLogsState} from "@store/admin-logs.state";

@Component({
	selector: 'cwb-session-caption-dialog',
	templateUrl: './session-caption-dialog.component.html',
	styleUrls: ['./session-caption-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionCaptionDialogComponent {
	@Select(AdminLogsState.captionLogs)
	public captionLogs!: Observable<ISessionCaptionLogs[]>

	constructor(private dialogRef: DialogRef) {
	}

	close = () => this.dialogRef.close()
}
