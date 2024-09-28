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
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean>| Promise<boolean> | boolean{

            console.log('Auth Guard')
            if (!this.authService.getToken()) {
                this.router.navigate(['/login']);
                return false;
              }

        return this.authService.isLoggedIn().pipe(
            map((loggedIn) => {
                if (!loggedIn) {
                    this.router.navigate(['/login'])
                }
                return loggedIn
            })
            ,
        catchError(() => {
            this.router.navigate(['/login']);
            return of(false); // Ensure to return false on error
        })
    );
        
    }
}
