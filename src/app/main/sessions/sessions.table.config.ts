import {SessionLinkComponent} from "./sessions-table/session-link/session-link.component";
import {
    SessionTableActionsComponent
} from "./sessions-table/session-table-actions/session-table-actions.component";
import {
    SessionStatusBadgeComponent
} from "./sessions-table/session-status-badge/session-status-badge.component";
import {
    SessionStartTimeComponent
} from "./sessions-table/session-start-time/session-start-time.component";
import {DateTime} from "luxon";

export const sessionsTableConfig = {
    sessionId: {
        title: 'Session ID',
        width: '120px'
    },
    title: {
        title: 'Booking',
        type: 'custom',
        renderComponent: SessionLinkComponent,
        // width: '192px'
    },
    owner: {
        title: 'Owner',
        class: 'preserve',
        type: 'html',
        valuePrepareFunction: (owner: string) => (
            '<span class="preserve">' + owner + '</span>'
        ),
    },
    startEpoch: {
        title: 'Start time',
        width: '180px',
        type: 'custom',
        renderComponent: SessionStartTimeComponent,
        filter: true,
        filterFunction: (date: number, par: string) =>
            DateTime
                .fromSeconds(date)
                .toFormat('dd MMM yyyy hh:mm a')
                .toString()
                .toLowerCase()
                .includes(par.toLowerCase()),
        sort: true
    },
    sessionDurationMins: {
        title: 'Duration (mins)',
        width: '152px',
    },
    status: {
        title: 'Status',
        type: 'custom',
        renderComponent: SessionStatusBadgeComponent,
        width: '133px',
        filter: {
            type: 'list',
            config: {
                selectText: 'All',
                list: [
                    {value: 'future', title: 'Future'},
                    {value: 'cancelled', title: 'Cancelled'},
                    {value: 'completed', title: 'Completed'},
                    {value: 'running', title: 'Running'},
                ],
            },
        }
    },
    actions: {
        title: 'Actions',
        type: 'custom',
        renderComponent: SessionTableActionsComponent,
        filter: false,
        sort: false,
        width: '132px'
    }
}
