import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";
import {environment} from "@env";
import {from, of, switchMap} from "rxjs";
import {Actions, ofActionCompleted, Store} from "@ngxs/store";
import {Router} from "@angular/router";
import {LogInResponse} from "@store/auth.actions";

@Component({
    selector: 'cwb-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    public form: FormGroup = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
    });

    constructor(
        private store: Store,
        private actions: Actions,
        private router: Router
    ) {
    }

    public login() {
        const form = this.form.value
        const role = environment.role

        this.store
            .dispatch(new Send({
                type: MessageType.LogIn,
                data: {...form, role: role === 'booking' ? 'viewer' : role}
            }))
            .pipe(
                switchMap(() => this.actions.pipe(ofActionCompleted(LogInResponse))),
                switchMap(({action: {code}}) => code === 200
                    ? from(this.router.navigate(['/', 'bookings']))
                    : of({}))
            ).subscribe()
    }
}
