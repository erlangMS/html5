import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {


  constructor() { }

  canActivate() {
    if(localStorage.getItem('token') != "") {
      return true;
    }else {
      return false;
    }
  }
}
