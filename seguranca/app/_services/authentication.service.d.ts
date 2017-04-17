import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
export declare class AuthenticationService {
    private http;
    private route;
    token: any;
    time: number;
    intervalId: any;
    constructor(http: Http, route: Router);
    login(url: string, body: string, authorization: string): Observable<boolean>;
    authenticateClient(url: string, body: string, authorization: string): Observable<boolean>;
    getUrl(clientId: number, arquivo: string): Observable<{
        url: string;
        body: any;
        authorization: any;
    }>;
    getUrlForDirectLogin(login: string, senha: string, arquivo: string): Observable<{
        url: string;
        body: any;
        authorization: any;
    }>;
    periodicIncrement(sessionTime: number): void;
    cancelPeriodicIncrement(): void;
    getSitemap(): Observable<any>;
    logout(): void;
}
