import { OnInit } from '@angular/core';
import { EventManagerService } from "../_register/event.amanger.service";
export declare class RecaptchaComponent implements OnInit {
    private eventManager;
    sitekey: any;
    constructor(eventManager: EventManagerService);
    ngOnInit(): void;
    render(): void;
    verified(response: any): void;
}
