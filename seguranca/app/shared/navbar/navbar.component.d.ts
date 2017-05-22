import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
export declare class NavbarComponent {
    private http;
    brand: string;
    controlador: boolean;
    overlay: string;
    menus: any;
    html: any;
    constructor(http: Http);
    carregarBars(): void;
    createTemplate(): Observable<any>;
}
