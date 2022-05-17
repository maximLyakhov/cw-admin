import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Select} from "@ngxs/store";
import {AuthState} from "@store/auth.state";
import {IUserSettings} from "@interfaces/user.interfaces";

@Component({
    selector: 'cwb-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {
    @Select(AuthState.userInfo) public user$!: Observable<IUserSettings>
}
