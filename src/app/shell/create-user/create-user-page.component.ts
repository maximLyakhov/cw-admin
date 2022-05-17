import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '@services/users.service';
import {checkPasswords} from "@helpers/check-passwords";
import {UntilDestroy} from "@ngneat/until-destroy";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {SetBreadcrumbs} from "@store/breadcrumbs.actions";
import {environment} from "@env";

@UntilDestroy()
@Component({
    selector: 'cwb-create-user',
    templateUrl: './create-user-page.component.html',
    styleUrls: ['./create-user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserPageComponent implements OnInit {
    public isAdmin = environment.role === 'admin'
    public form: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
        timeZone: new FormControl('', [Validators.required]),
    }, {
        validators: checkPasswords()
    })

    constructor(
        private createUserService: UsersService,
        private router: Router
    ) {
    }

    @Dispatch()
    ngOnInit() {
        return new SetBreadcrumbs([
            {title: 'Back to login', path: ''},
            {title: 'Register'}
        ])
    }

    create(): void {
        this.createUserService.create$(this.form.value)
        this.router.navigate(['bookings']).then()
    }
}
