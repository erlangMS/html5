import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { AuthenticationService } from "../_services/authentication.service";
export declare class RedirectService implements OnDestroy {
    private authenticationService;
    private loc;
    location: Location;
    timeSession: number;
    localDateTime: number;
    private error;
    constructor(authenticationService: AuthenticationService, loc: Location);
    startInitVerifySessionToken(): void;
    ngOnDestroy(): void;
    private verifyTimeTokenExpired();
    private initVerificationRedirect();
    private redirectWithCodeUrl(code);
    private authenticateClient();
}
