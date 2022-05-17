import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Select} from "@ngxs/store";
import {AuthState} from "@store/auth.state";

@Component({
    selector: 'cwb-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
    @Select(AuthState.logged) public isAuthorized$!: Observable<boolean>
}
