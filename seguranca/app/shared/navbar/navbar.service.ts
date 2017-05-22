import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NavbarComponent } from './navbar.component';

@Injectable()
export class NavbarService {

  constructor( private http: Http, private navbarComponent: NavbarComponent){
  }

  createTemplate():Observable<boolean>{
    let path = localStorage.getItem('templateFile');
    return this.http.get(path)
      .map((res) => {
        this.navbarComponent.menus = res.json();
     return true;
   });
  }

}
