import {Component, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {AuthState} from "@store/auth.state";
import {distinctUntilChanged, from, Observable, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";
import {routesAuth, routesNoAuth} from "./app-routing.module";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Relogin} from "@store/auth.actions";

@Component({
    selector: 'cwb-root',
    template: `
			<router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit {
    @Select(AuthState.logged) private logged!: Observable<boolean>

    constructor(private router: Router) {
    }

    @Dispatch()
    ngOnInit() {
        this.logged
            .pipe(
                tap((logged) => logged
                    ? this.router.resetConfig([...routesAuth])
                    : this.router.resetConfig([...routesNoAuth])
                ),
                distinctUntilChanged(),
                switchMap(() =>
                    from(this.router.navigate(['/']))
                )
            )
            .subscribe()

        return new Relogin()
    }
}
