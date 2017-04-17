import { OnInit } from '@angular/core';
import { RedirectService } from "./_redirect/redirect.service";
export declare class SecurityComponent implements OnInit {
    private redirectService;
    constructor(redirectService: RedirectService);
    ngOnInit(): void;
}
