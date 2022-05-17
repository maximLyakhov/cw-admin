import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ErrorHandlerService} from '@services/error-handler.service';
import {BehaviorSubject, delay, Observable} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

const ERROR_TIME = 2000;

@UntilDestroy()
@Component({
    selector: 'cwb-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {
    private showError$$: BehaviorSubject<Error | null> = new BehaviorSubject<Error | null>(null);
    public messages$: Observable<Error | null> = this.showError$$.asObservable();

    constructor(private error: ErrorHandlerService) {
    }

    ngOnInit(): void {
        this.error.listen$()
            .pipe(untilDestroyed(this))
            .subscribe(this.showError$$);

        this.error.listen$()
            .pipe(
                untilDestroyed(this),
                filter(Boolean),
                delay(ERROR_TIME),
                tap(() => this.showError$$.next(null))
            ).subscribe();
    }
}
