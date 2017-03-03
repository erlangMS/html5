import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from "./_services/authentication.service";
export declare class AppComponent implements OnInit {
    private authenticationService;
    private loc;
    location: Location;
    constructor(authenticationService: AuthenticationService, loc: Location);
    ngOnInit(): void;
}
