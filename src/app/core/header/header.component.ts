import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '@env';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Select} from "@ngxs/store";
import {AuthState} from "@store/auth.state";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";

@Component({
    selector: 'cwb-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    @Select(AuthState.logged) public isLoggedIn$!: Observable<boolean>
    public isAdmin = environment.role === 'admin';

    @Dispatch()
    public logout() {
        return new Send({type: MessageType.LogOut})
    }
}
