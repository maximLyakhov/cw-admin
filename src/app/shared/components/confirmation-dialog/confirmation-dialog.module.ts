import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmationDialogComponent} from "@cmp/confirmation-dialog/confirmation-dialog.component";
import {SmallButtonModule} from "@core/small-button/small-button.module";

@NgModule({
    declarations: [
        ConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        SmallButtonModule
    ],
    exports: [
        ConfirmationDialogComponent
    ]
})
export class ConfirmationDialogModule {
}
