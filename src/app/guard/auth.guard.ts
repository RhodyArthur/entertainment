import {
    ActivatedRouteSnapshot,
    CanActivate,
    GuardResult,
    MaybeAsync,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        // if (!this.authService.getToken()) {
        //
        // }

        return this.authService.isLoggedIn().pipe(
            map((loggedIn) => {
                if (!loggedIn) {
                    this.router.navigate(['login'])
                }
                return loggedIn
            })
        )
    }
}
