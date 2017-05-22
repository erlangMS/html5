import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
export declare class NavbarComponent {
    private http;
    private router;
    brand: string;
    controlador: boolean;
    overlay: string;
    menus: any;
    private html;
    constructor(http: Http, router: Router);
    carregarBars(): void;
    createTemplate(): Observable<any>;
}
