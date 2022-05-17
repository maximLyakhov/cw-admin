import {NgxsModule} from "@ngxs/store";
import {WebsocketState} from "@store/websocket.state";
import {SessionsState} from "@store/sessions.state";
import {BookingsState} from "@store/bookings.state";
import {AuthState} from "@store/auth.state";
import {UsersState} from "@store/users.state";
import {BillingsState} from "@store/billings.state";
import {BreadcrumbsState} from "@store/breadcrumbs.state";
import {environment} from "@env";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {NgxsWebsocketPluginModule} from "@ngxs/websocket-plugin";
import {NgxsDispatchPluginModule} from "@ngxs-labs/dispatch-decorator";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {AdminLogsState} from "@store/admin-logs.state";

export const state = [
    NgxsModule.forRoot(
        [
            WebsocketState,
            SessionsState,
            BookingsState,
            AuthState,
            UsersState,
            BillingsState,
            BreadcrumbsState,
            AdminLogsState
        ],
        {
            developmentMode: !environment.production,
        }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
        key: [
            WebsocketState,
            BookingsState,
            AuthState,
            UsersState,
            BillingsState
        ],
    }),
    NgxsWebsocketPluginModule.forRoot({url: environment.backend}),
    NgxsDispatchPluginModule.forRoot(),
    NgxsSelectSnapshotModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
]
