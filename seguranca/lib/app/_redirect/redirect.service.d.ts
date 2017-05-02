import { Location } from '@angular/common';
import { AuthenticationService } from "../_services/authentication.service";
import { ActivatedRoute } from '@angular/router';
export declare class RedirectService {
    private authenticationService;
    private loc;
    private activatedRoute;
    location: Location;
    timeSession: number;
    localDateTime: number;
    private error;
    constructor(authenticationService: AuthenticationService, loc: Location, activatedRoute: ActivatedRoute);
    initVerificationRedirect(): void;
    redirectWithCodeUrl(code: string): void;
    authenticateClient(): void;
}
