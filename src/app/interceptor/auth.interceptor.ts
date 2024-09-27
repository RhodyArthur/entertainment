import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class authInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();

        // if token exists, clone the request to add the authentication header
        if (authToken) {
            const newRq = req.clone({
                headers: req.headers.append('Bearer', authToken)
            })
            return next.handle(newRq)
        }

        return next.handle(req);
    }
}
