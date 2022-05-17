import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from './reset-password.service';
import {Router} from '@angular/router';
import {environment} from '@env';
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {SetBreadcrumbs} from "@store/breadcrumbs.actions";

@Component({
    selector: 'cwb-password-reset',
    templateUrl: './password-reset-page.component.html',
    styleUrls: ['./password-reset-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ResetPasswordService
    ]
})
export class PasswordResetPageComponent implements OnInit {
    public form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });
    public role = environment.role;

    constructor(
        private resetPasswordService: ResetPasswordService,
        private router: Router
    ) {
    }

    @Dispatch()
    ngOnInit() {
        return new SetBreadcrumbs([
            {title: 'Back to Login', path: ''},
            {title: 'Password reset'}
        ])
    }

    public reset() {
        this.resetPasswordService.reset$(
            this.form.controls['email'].value,
            this.role
        )

        this.router.navigate(['/']).then()
    }
}
