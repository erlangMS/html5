import {Location} from '@angular/common';
import { Injectable } from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class RedirectService {

  public location: Location;

  public timeSession: number = 3600;

  public localDateTime: number;

  private error:string = '';

  constructor(private authenticationService: AuthenticationService, private loc: Location, private activatedRoute: ActivatedRoute){
    this.location = loc;
  }

  initVerificationRedirect() {
    if(sessionStorage.getItem("dateAccessPage") && this.authenticationService.currentUser.token != ""){
      let dateSecoundAccess = Date.now();
      this.localDateTime = Number(sessionStorage.getItem("dateAccessPage"));
      let value = dateSecoundAccess - this.localDateTime;
      if(value >= (this.timeSession * 3600)){
        this.authenticationService.logout();
      }

    }else{
      if(this.authenticationService.currentUser.token) {
        this.authenticationService.periodicIncrement(3600);
        this.localDateTime = Date.now();
        sessionStorage.setItem("dateAccessPage",this.localDateTime.toString());
      }else {
        this.authenticateClient();
      }

    }

  }
  
  redirectWithCodeUrl(code:string) {
    this.authenticationService.getUrlUser('/seguranca/url_security.json')
      .subscribe(resultado =>{
        var url = resultado.url;
        this.authenticationService.redirectUserTokenAccess(url, resultado.client_id, resultado.client_secret,code,
          resultado.grant_type, resultado.url_redirect)
          .subscribe(resultado => {
            console.log('Funcionou !!');
          })
      });
  }

  authenticateClient(){
    if(this.authenticationService.currentUser.token == '') {
      this.authenticationService.logout();
      this.authenticationService.getUrl('/seguranca/url_security.json')
        .subscribe (resultado => {
          window.location.href = resultado.url;
        });
    } else {
      this.authenticationService.getUrl('/seguranca/url_security.json')
        .subscribe (resultado => {
          if(resultado.store == 'variable'){
            this.authenticationService.currentUser.authorization = resultado.authorization;
            localStorage.removeItem('externalFile');
          }
        });
    }
  }


}
