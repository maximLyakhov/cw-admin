import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ViewCell} from "ng2-smart-table";
import {IAdminSession} from "@interfaces/session.interfaces";

@Component({
		selector: 'cwb-session-start-time',
		templateUrl: './session-start-time.component.html',
		styleUrls: ['./session-start-time.component.scss'],
		changeDetection: ChangeDetectionStrategy.OnPush
})
export class SessionStartTimeComponent implements ViewCell {
		@Input() public rowData!: IAdminSession
		@Input() public value!: string
}
