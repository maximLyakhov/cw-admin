import {APP_INITIALIZER, ErrorHandler} from "@angular/core";
import {Store} from "@ngxs/store";
import {ApplicationErrorHandler} from "@services/application-error-handler";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import {DialogService} from "@services/dialog.service";
import {ErrorHandlerService} from "@services/error-handler.service";
import {UsersService} from "@services/users.service";
import {ConnectWebSocket} from "@ngxs/websocket-plugin";

function initialize(store: Store) {
    return () => store.dispatch(new ConnectWebSocket());
}

export const providers = [
    {
        provide: APP_INITIALIZER,
        useFactory: initialize,
        deps: [Store],
        multi: true,
    },
    {
        provide: ErrorHandler,
        useClass: ApplicationErrorHandler,
    },
    {
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
        useValue: {
            duration: 5000,
        },
    },
    DialogService,
    ErrorHandlerService,
    UsersService,
]
