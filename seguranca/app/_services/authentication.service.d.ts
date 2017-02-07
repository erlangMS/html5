import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
export declare class AuthenticationService {
    private http;
    private route;
    token: string;
    time: number;
    intervalId: any;
    constructor(http: Http, route: Router);
    login(url: string, body: string): Observable<boolean>;
    periodicIncrement(sessionTime: number): void;
    cancelPeriodicIncrement(): void;
    getSitemap(): Observable<any>;
    logout(): void;
}
