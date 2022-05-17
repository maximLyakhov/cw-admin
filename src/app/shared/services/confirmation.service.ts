import {Injectable} from '@angular/core';
import {ConfirmationDialogComponent} from '@cmp/confirmation-dialog/confirmation-dialog.component';
import {DialogService} from "@services/dialog.service";
import {firstValueFrom} from "rxjs";

@Injectable({providedIn: 'root'})
export class ConfirmationService {

    constructor(private dialog: DialogService) {
    }

    async open$(
        message: string,
        confirmBtnText = 'Confirm',
        cancelBtnText?: string
    ): Promise<boolean> {

        await import('./../components/confirmation-dialog/confirmation-dialog.module');

        return firstValueFrom(this.dialog
            .open(
                ConfirmationDialogComponent,
                {
                    data: {
                        text: message,
                        confirmText: confirmBtnText,
                        cancelText: cancelBtnText
                    }
                }
            )
            .afterClosed()
        )
    }
}
