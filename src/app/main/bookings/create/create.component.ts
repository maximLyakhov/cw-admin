import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "@env";
import {Observable} from "rxjs";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {AuthState} from "@store/auth.state";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";
import {Select} from "@ngxs/store";
import {IUser} from "@interfaces/user.interfaces";
import {UsersState} from "@store/users.state";
import {SetBreadcrumbs} from "@store/breadcrumbs.actions";
import {DateTime} from "luxon";
import {apiDateFormat} from "@constants/api-date-format";

const now = DateTime.now()

@Component({
	selector: 'cwb-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
	@SelectSnapshot(AuthState.userTimeZone) userTimeZone!: string
	@Select(UsersState.users) public users$!: Observable<IUser[]>
	public isAdmin = environment.role === 'admin'
	firstFormGroup = new FormGroup({
		title: new FormControl(
				null,
				[Validators.required, Validators.maxLength(100)]
		),
		startDate: new FormControl(
				now.plus({day: 2}).toFormat(apiDateFormat),
				[Validators.required]
		),
		startTime: new FormControl(
				`${now.get('hour')}:${now.get('minute')}`,
				[Validators.required]
		),
		durationMins: new FormControl(
				60,
				[Validators.required, Validators.min(15)]
		),
		timeZoneOverride: new FormControl(this.userTimeZone),
		countWeeks: new FormControl(
				1,
				[Validators.required, Validators.min(1)]
		),
		allowOverrun: new FormControl(0)
	});

	secondFormGroup = new FormGroup({
		oboUserId: new FormControl(null, []),
		audioDetails: new FormControl('Audio Details'),
		captionDispDetails: new FormControl('Captions can be viewed in the CaptionWorks viewer')
	});

	thirdFormGroup = new FormGroup({
		requirePasscode: new FormControl(0),
		requireLogin: new FormControl(0),
		authorisedViewerEmails: new FormControl(),
		authorisedViewersOnly: new FormControl(0)
	});

	@Dispatch()
	ngOnInit() {
		if (this.isAdmin) this.getUsers()

		return new SetBreadcrumbs([
			{title: 'Bookings', path: '/bookings'},
			{title: 'New booking'}
		])
	}

	@Dispatch() getUsers = () => new Send({type: MessageType.GetUsers})

	@Dispatch()
	createBooking() {
		const {
			title,
			countWeeks,
			allowOverrun,
			durationMins,
			startDate,
			startTime,
			timeZoneOverride
		} = this.firstFormGroup.value

		const {
			oboUserId,
			audioDetails,
			captionDispDetails
		} = this.secondFormGroup.value

		const {
			requireLogin,
			requirePasscode,
			authorisedViewerEmails,
			authorisedViewersOnly
		} = this.thirdFormGroup.value

		const data = {
			title,
			sessionList: [
				{
					day: DateTime.fromFormat(startDate, apiDateFormat).get('weekday') - 1,
					startHour: Number(startTime.split(':')[0]),
					startMin: Number(startTime.split(':')[1]),
					durationMins: Number(durationMins)
				}
			],
			startDate,
			allowOverrun: Number(allowOverrun),
			timeZoneOverride,
			countWeeks,
			audioDetails,
			captionDispDetails,
			requirePasscode: Number(requirePasscode),
			requireLogin: Number(requireLogin),
			authorisedViewerEmails,
			authorisedViewersOnly: Number(authorisedViewersOnly),
			oboUserId: Number(oboUserId)
		}

		return new Send({type: MessageType.CreateBooking, data})
	}
}
