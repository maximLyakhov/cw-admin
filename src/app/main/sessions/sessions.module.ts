import {NgModule} from '@angular/core';
import {SessionsRoutingModule} from './sessions-routing.module';
import {SessionsPageComponent} from './sessions-page.component';
import {OwnerPipe} from './owner.pipe';
import {SessionViewerLogsDialogComponent} from './dialogs/session-viewer-logs-dialog/session-viewer-logs-dialog.component';
import {SessionCaptionDialogComponent} from './dialogs/session-caption-dialog/session-caption-dialog.component';
import {SessionDialogComponent} from './dialogs/session-dialog/session-dialog.component';
import {SessionLinkComponent} from './sessions-table/session-link/session-link.component';
import {SessionTableActionsComponent} from './sessions-table/session-table-actions/session-table-actions.component';
import {SessionsService} from './sessions.service';
import {SessionStatusBadgeComponent} from './sessions-table/session-status-badge/session-status-badge.component';
import {RangePickerModule} from "@cmp/range-picker/range-picker.module";
import {SmartTableModule} from "@cmp/smart-table/smart-table.module";
import {CheckboxModule} from "@cmp/checkbox/checkbox.module";
import {DatePickerModule} from "@cmp/date-picker/date-picker.module";
import {TextareaModule} from "@cmp/textarea/textarea.module";
import {LayoutsModule} from "@core/layouts/layouts.module";
import {CommonModule} from "@angular/common";
import {SvgIconModule} from "@core/svg-icon/svg-icon.module";
import {InputModule} from "@core/input/input.module";
import {SmallButtonModule} from "@core/small-button/small-button.module";
import {PipesModule} from "@pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BadgeModule} from "@cmp/badge/badge.module";
import {SessionStartTimeComponent} from './sessions-table/session-start-time/session-start-time.component';

@NgModule({
    declarations: [
        SessionsPageComponent,
        OwnerPipe,
        SessionViewerLogsDialogComponent,
        SessionCaptionDialogComponent,
        SessionDialogComponent,
        SessionLinkComponent,
        SessionTableActionsComponent,
        SessionStatusBadgeComponent,
        SessionStartTimeComponent,
    ],
    imports: [
        CommonModule,
        PipesModule,
        ReactiveFormsModule,
        SvgIconModule,
        LayoutsModule,
        SessionsRoutingModule,
        RangePickerModule,
        SmartTableModule,
        CheckboxModule,
        DatePickerModule,
        TextareaModule,
        InputModule,
        SmallButtonModule,
        BadgeModule
    ],
    providers: [SessionsService]
})
export class SessionsModule {
}
