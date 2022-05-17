import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {checkPasswords} from "@helpers/check-passwords";
import {IUser} from "@interfaces/user.interfaces";
import {environment} from "@env";

@Component({
    selector: 'cwb-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
    @Output() dataChange = new EventEmitter<any>();
    public isAdmin = environment.role === 'admin'

    public form: FormGroup = new FormGroup({
        userId: new FormControl(''),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('',
            [
                Validators.required,
                Validators.pattern(/\S+@\S+\.\S+/)
            ]
        ),
        password: new FormControl('', [Validators.required]),
        password2: new FormControl('', [Validators.required]),
        timeZone: new FormControl('', [Validators.required]),
        isAdmin: new FormControl(false, [Validators.required]),
        isCaptioner: new FormControl(false, [Validators.required]),
        respeakerRate: new FormControl(''),
    }, {
        validators: checkPasswords()
    })

    @Input()
    set data(user: IUser) {
        if (user) {
            this.form.removeControl('password');
            this.form.removeControl('password2');
            this.form.removeValidators(checkPasswords());
            this.form.updateValueAndValidity({emitEvent: false});
            this.form.patchValue(Object.assign({}, user, {password: '', password2: ''}), {emitEvent: false});
        }

    }

    save() {
        if (this.form.valid) {
            const data = this.form.value;
            delete data.password2;
            Object.assign(data, {
                isAdmin: (data.isAdmin) ? 1 : 0,
                isCaptioner: (data.isCaptioner) ? 1 : 0,
                respeakerRate: parseFloat(data.respeakerRate)
            })
            this.dataChange.emit(data);
        }
    }
}
