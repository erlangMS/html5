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
    static client_secret: string;
    static port_server: string;
    static currentUser: any;
    constructor(http: Http, route: Router);
    login(url: string, body: string, authorization: string): Observable<boolean>;
    getUrlUser(arquivo: string): Observable<any>;
    getUrl(arquivo: string): Observable<any>;
    redirectUserTokenAccess(url: string, client_id: string, client_secret: string, code: string, grant_type: string, redirect_uri: string): Observable<boolean>;
    getUrlForDirectLogin(login: string, senha: string, arquivo: string): Observable<{
        url: string;
        body: any;
        authorization: any;
    }>;
    periodicIncrement(sessionTime: number): void;
    cancelPeriodicIncrement(): void;
    logout(): void;
    findUser(): Observable<void>;
}
