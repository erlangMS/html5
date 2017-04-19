import {Location} from '@angular/common';
import { Injectable } from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class RedirectService {

  public location: Location;

  public timeSession: number = 3600;


  public localDateTime: number;

  private error:string = '';

  constructor(private authenticationService: AuthenticationService, private loc: Location){
    this.location = loc;
  }

  initVerificationRedirect() {
    if(localStorage.getItem("dateAccessPage")){
      let dateSecoundAccess = Date.now();
      this.localDateTime = Number(localStorage.getItem("dateAccessPage"));
      let value = dateSecoundAccess - this.localDateTime;
      if(value >= (this.timeSession * 1000)){
        this.authenticationService.logout();
      }

    }else{
      this.localDateTime = Date.now();
      localStorage.setItem("dateAccessPage",this.localDateTime.toString());
    }

    if(localStorage.getItem('currentUser')) {
      let sessionTime = JSON.parse(localStorage.getItem('currentUser'));
      this.authenticationService.periodicIncrement(this.timeSession);
    }else {
      this.authenticateClient();
    }
  }

  authenticateClient(){
    this.authenticationService.getUrl('/seguranca/url_security.json')
      .subscribe(resultado =>{
        localStorage.setItem('authorization',JSON.stringify(resultado.authorization));
        window.location.href = resultado.url;
      });
  }


}
