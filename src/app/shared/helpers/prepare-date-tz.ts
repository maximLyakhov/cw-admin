import {Injector} from "@angular/core";
import {AdjustTimePipe} from "@pipes/adjust-time.pipe";

export function prepareDateTz(date: number): string {
    const injector = Injector.create(
        {providers: [{provide: AdjustTimePipe}]}
    )

    return injector.get(AdjustTimePipe).transform(date)
}
