import {ChangeDetectionStrategy, Component} from '@angular/core';
import {environment} from '@env';
import {SessionsService} from '../../../sessions/sessions.service';
import {ISession} from "@interfaces/session.interfaces";
import {Select} from "@ngxs/store";
import {BookingsState} from "@store/bookings.state";
import {Observable} from "rxjs";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {AuthState} from "@store/auth.state";

@Component({
    selector: 'cwb-sessions',
    templateUrl: './sessions.component.html',
    styleUrls: ['./sessions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsComponent {
    public isAdmin = environment.role === 'admin';
    @Select(BookingsState.bookingSessions) public bookingSessions!: Observable<ISession[]>
    @SelectSnapshot(AuthState.userTimeZone) public userTZ!: string

    constructor(private sessionService: SessionsService) {
    }

    edit(session: ISession) {
        this.sessionService.edit$(session).subscribe()
    }

    cancel(id: number) {
        this.sessionService.cancel$(id)
    }

    isEditable(session: ISession): boolean {
        return session.status === 'Future';
    }
}
