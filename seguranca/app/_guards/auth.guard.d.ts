import { Router, CanActivate } from '@angular/router';
import { Http } from '@angular/http';
import { AuthenticationService } from "../_services/authentication.service";
import { CookieService } from "../_cookie/cookie.service";
export declare class AuthGuard implements CanActivate {
    private router;
    private http;
    private authenticationService;
    private cookieService;
    constructor(router: Router, http: Http, authenticationService: AuthenticationService, cookieService: CookieService);
    private menu;
    canActivate(): boolean;
}
