import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {from, Observable} from 'rxjs';
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {AuthState} from "@store/auth.state";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  @SelectSnapshot(AuthState.logged) private logged!: boolean

  constructor(private router: Router) {
  }

  canActivate(
      _: ActivatedRouteSnapshot,
      __: RouterStateSnapshot
  ): boolean | Observable<boolean> {

    return this.logged || from(this.router.navigate(['']));
  }
}
