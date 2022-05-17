import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {DateTime} from 'luxon';
import {AuthState} from "@store/auth.state";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";

@Pipe({name: 'adjustTime', pure: true})
export class AdjustTimePipe implements PipeTransform {
    @SelectSnapshot(AuthState.userTimeZone) userTimezone!: string

    constructor(
        @Inject(LOCALE_ID) private locale: string
    ) {
    }

    transform(
        start: number,
        overriddenTimeZone?: string,
        showTz?: boolean
    ): string {
        return DateTime
            .fromSeconds(
                start,
                {
                    zone:
                        overriddenTimeZone ||
                        this.userTimezone
                }
            )
            .toFormat(
                showTz
                    ? `dd MMM y\nhh:mm a\nz`
                    : `dd MMM y\nhh:mm a`
            )
    }
}
