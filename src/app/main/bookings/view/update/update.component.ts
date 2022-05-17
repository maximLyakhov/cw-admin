import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateService} from './update.service';
import {IBooking} from "@interfaces/booking.interfaces";
import {BookingsState} from "@store/bookings.state";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {SetBreadcrumbs} from "@store/breadcrumbs.actions";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'cwb-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UpdateService]
})
export class UpdateComponent implements OnInit {
    @ViewChild('tooltip') clipboard: any;
    public form = new FormGroup({
        title: new FormControl('', Validators.required),
        audioDetails: new FormControl('', Validators.required),
        captionDispDetails: new FormControl('', Validators.required),
        timeZoneOverride: new FormControl(''),
        requirePasscode: new FormControl(false),
        requireLogin: new FormControl(false),
        viewerEmails: new FormControl(''),
        bookingPasscode: new FormControl(''),
        authorisedViewersOnly: new FormControl(0),
        bookingCaptionerPasscode: new FormControl('')
    });
    @SelectSnapshot(BookingsState.booking) private booking!: IBooking

    constructor(private updateService: UpdateService) {
    }

    @Dispatch()
    ngOnInit() {
        const {
            title,
            audioDetails,
            captionDispDetails,
            viewerEmails,
            bookingTimeZone,
            requirePasscode,
            requireLogin,
            bookingPasscode,
            bookingCaptionerPasscode
        } = this.booking;
        let hasAuthorisedViewers = 0

        if (viewerEmails) {
            if (viewerEmails.split("\n").length > 0) {
                hasAuthorisedViewers = 1
            }
        }

        this.form.setValue({
            title,
            audioDetails,
            captionDispDetails,
            timeZoneOverride: bookingTimeZone,
            requirePasscode,
            requireLogin,
            bookingPasscode: (bookingPasscode.length < 5) ? "not required" : bookingPasscode,
            authorisedViewersOnly: hasAuthorisedViewers,
            viewerEmails,
            bookingCaptionerPasscode
        });

        this.form.controls['authorisedViewersOnly'].valueChanges
            .pipe(untilDestroyed(this))
            .subscribe((value) => {
                this.form.controls['requireLogin'].setValue(value)
            })

        return new SetBreadcrumbs([
            {title: 'Bookings', path: 'bookings'},
            {title: 'Edit booking: ' + this.booking.title}
        ])
    }

    update() {
        if (this.form.valid) {
            const newData = this.form.value
            const data = {
                title: newData.title,
                audioDetails: newData.audioDetails,
                captionDispDetails: newData.captionDispDetails,
                timeZoneOverride: newData.timeZoneOverride,
                bookingPasscode: newData.bookingPasscode,
                requirePasscode: (newData.requirePasscode) ? 1 : 0,
                requireLogin: (newData.requireLogin) ? 1 : 0,
                authorisedViewersOnly: newData.authorisedViewersOnly ? 1 : 0,
                authorisedViewerEmails: newData.viewerEmails ?? ''
            }

            this.updateService.updateBooking$(this.booking.bookingToken, data)
        }
    }
}
