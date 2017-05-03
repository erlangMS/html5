import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Http } from '@angular/http';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private http: Http, private authenticationService: AuthenticationService) { }

  canActivate() {
    if (this.authenticationService.currentUser.token != "") {
      return true;
    }else {
      return false;
    }
  }
}
