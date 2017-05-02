import { OnInit } from '@angular/core';
import { RedirectService } from "./_redirect/redirect.service";
import { AuthenticationService } from "./_services/authentication.service";
export declare class SecurityComponent implements OnInit {
    private redirectService;
    private authenticationService;
    constructor(redirectService: RedirectService, authenticationService: AuthenticationService);
    ngOnInit(): void;
}
