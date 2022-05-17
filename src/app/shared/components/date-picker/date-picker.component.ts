import {ChangeDetectionStrategy, Component, Input, OnInit, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from "@angular/forms";
import {datePickerLocaleConfig} from "@constants/date-picker-locale.config";
import {distinctUntilChanged, tap} from "rxjs";
import {filter, map} from "rxjs/operators";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DateTime} from "luxon";
import {apiDateFormat} from "@constants/api-date-format";
import * as dayjs from "dayjs";

@UntilDestroy()
@Component({
    selector: 'cwb-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
    @Input() public label: string = ''
    @Input() public isEditMode: boolean = false
    public datePicker = new FormControl()
    public locale = datePickerLocaleConfig
    public minDate!: dayjs.Dayjs
    private onChange!: (value: any) => void;

    constructor(
        @Self() private readonly ngControl: NgControl,
    ) {
        this.ngControl.valueAccessor = this
    }

    ngOnInit() {
        this.isEditMode
            ? this.minDate = dayjs().subtract(-2, 'd')
            : this.minDate = dayjs()

        this.datePicker
            .valueChanges
            .pipe(
                untilDestroyed(this),
                filter((date) => Boolean(date.startDate)),
                map(
                    (range: { startDate: any }): any =>
                        DateTime
                            .fromJSDate(range.startDate.$d)
                            .toFormat(apiDateFormat)
                ),
                distinctUntilChanged(),
                tap(this.onChange)
            )
            .subscribe()
    }

    writeValue(date: string): void {
        this.datePicker.setValue({startDate: date}, {emitEvent: false})
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    private onTouched = () => {
    }
}
