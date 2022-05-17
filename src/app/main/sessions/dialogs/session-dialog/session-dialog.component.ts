import {ChangeDetectionStrategy, Component, Inject, OnInit,} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DEFAULT_SESSION_DURATION, MINIMUM_SESSION_DURATION,} from '@constants/const';
import {environment} from '@env';
import {ISession} from '@interfaces/session.interfaces';
import {DIALOG_DATA, DialogRef} from '@services/dialog.service';
import {UntilDestroy} from "@ngneat/until-destroy";
import {DateTime} from "luxon";
import {apiDateFormat} from "@constants/api-date-format";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {IUserSettings} from "@interfaces/user.interfaces";
import {AuthState} from "@store/auth.state";

interface IUpdateSession {
    sessionId: number
    startEpoch: number
    sessionDurationMins: number
    audioDetailsOverride: string
    captionDispOverride: string
    nonBilled: number
    respeakerRateOverride: number
    allowOverrun: number
}

@UntilDestroy()
@Component({
    selector: 'cwb-session-dialog',
    templateUrl: './session-dialog.component.html',
    styleUrls: ['./session-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionDialogComponent implements OnInit {
    public isAdmin = environment.role === 'admin';
    @SelectSnapshot(AuthState.userInfo) public user!: IUserSettings
    public inEditMode = false;
    public form!: FormGroup;

    constructor(
        private modal: DialogRef,
        @Inject(DIALOG_DATA) private data: ISession
    ) {
        const controls = {
            sessionId: new FormControl(null),
            startDate: new FormControl(
                DateTime
                    .fromJSDate(new Date())
                    .plus({day: 2})
                    .toFormat(apiDateFormat),
                [Validators.required]
            ),
            startTime: new FormControl(
                DateTime.now().get('hour') + ':' + DateTime.now().get('minute'),
                [Validators.required]
            ),
            sessionDurationMins: new FormControl(
                DEFAULT_SESSION_DURATION,
                [Validators.required, Validators.min(MINIMUM_SESSION_DURATION)]
            ),
            audioDetailsOverride: new FormControl(),
            audioDetailsOverrideCheck: new FormControl(true),
            captionDispOverride: new FormControl(),
            captionDispOverrideCheck: new FormControl(true),
            allowOverrun: new FormControl(false),
        };
        if (this.isAdmin) {
            Object.assign(controls, {
                nonBilled: new FormControl(),
                respeakerRateOverride: new FormControl(),
            });
        }
        this.form = new FormGroup(controls);
    }

    ngOnInit(): void {
        if (this.data) {
            this.inEditMode = true;
            const {
                sessionId,
                sessionDurationMins,
                startEpoch,
                audioDetailsOverride,
                captionDispOverride,
                respeakerRateOverride,
                allowOverrun,
                nonBilled
            } = this.data

            let validStartDate = DateTime.fromSeconds(
                startEpoch,
                {zone: this.user.timeZone}
            )

            if (!validStartDate.isValid) {
                validStartDate = DateTime.fromMillis(Number(new Date()))
            }

            this.form.patchValue({
                sessionId,
                startDate: validStartDate.toFormat(apiDateFormat),
                startTime: validStartDate.toFormat('HH:mm'),
                sessionDurationMins,
                audioDetailsOverride,
                captionDispOverride,
                allowOverrun,
                nonBilled,
                respeakerRateOverride
            })
        }
    }

    save() {
        const {
            sessionId,
            startDate,
            startTime,
            sessionDurationMins,
            audioDetailsOverride,
            captionDispOverride,
            allowOverrun,
            nonBilled,
            respeakerRateOverride
        } = this.form.value

        const updateData: { [x: string]: number | string } = {
            sessionId: Number(sessionId),
            startEpoch: Number(DateTime
                .fromFormat(
                    startDate + ':' + startTime, 'yyyy-MM-dd:hh:mm'
                )
                .toMillis()) / 1000,
            allowOverrun: Number(allowOverrun),
            nonBilled: Number(nonBilled),
            sessionDurationMins: Number(sessionDurationMins),
            respeakerRateOverride: Number(respeakerRateOverride),
            audioDetailsOverride,
            captionDispOverride
        }

        Object.keys(updateData).forEach((key) =>
            updateData[key] === null ||
            isNaN(updateData[key] as any) ||
            updateData[key] === undefined
                ? delete updateData[key] : {})

        this.close(updateData)
    }

    close(data?: Partial<IUpdateSession>) {
        this.modal.close(data);
    }

    setFormStatus(attr: string, target: string): void {
        const checked = this.form.controls[attr]?.value;
        const targetControl = this.form.controls[target]
        if (checked) {
            targetControl.disable()
            targetControl.removeValidators([Validators.required])
        } else {
            targetControl.enable();
            targetControl.setValidators([Validators.required])
        }
        targetControl.updateValueAndValidity()
    }
}
