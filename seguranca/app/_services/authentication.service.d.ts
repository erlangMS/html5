import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
export declare class AuthenticationService {
    private http;
    private route;
    token: string;
    time: number;
    intervalId: any;
    private url;
    private body;
    ip: any;
    constructor(http: Http, route: Router);
    login(url: string, body: string): Observable<boolean>;
    getUrl(login: string, senha: string): Observable<string>;
    getIpClient(): Observable<Response>;
    periodicIncrement(sessionTime: number): void;
    cancelPeriodicIncrement(): void;
    getSitemap(): Observable<any>;
    logout(): void;
}
