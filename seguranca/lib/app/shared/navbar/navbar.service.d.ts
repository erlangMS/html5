import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NavbarComponent } from './navbar.component';
export declare class NavbarService {
    private http;
    private navbarComponent;
    constructor(http: Http, navbarComponent: NavbarComponent);
    createTemplate(): Observable<boolean>;
}
