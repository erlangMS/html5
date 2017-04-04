import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { EventManagerService, IEventListenr } from "../_register/event.amanger.service";
export declare class LoginComponent implements OnInit, IEventListenr {
    private router;
    private authenticationService;
    private eventManager;
    private model;
    private loading;
    private error;
    private contadorLogin;
    captchaAprovado: boolean;
    constructor(router: Router, authenticationService: AuthenticationService, eventManager: EventManagerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    login(): void;
}
