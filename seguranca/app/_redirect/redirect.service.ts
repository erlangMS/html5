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


  startInitVerifySessionToken() {
    if(localStorage.getItem('token')){
      AuthenticationService.currentUser.token = localStorage.getItem('token');
    }

    if(localStorage.getItem("dateAccessPage") && AuthenticationService.currentUser.token != "") {
      this.verifyTimeTokenExpired ();
    }

    var client_id = location.search.split('code=')[1];
    if(client_id == undefined) {
      if(AuthenticationService.currentUser.token == '') {
        this.initVerificationRedirect();
      } else {
        this.authenticationService.periodicIncrement(3600);
      }
    } else if(AuthenticationService.currentUser.token == '' && client_id != undefined){
      this.redirectWithCodeUrl(client_id);
    }

  }


  private verifyTimeTokenExpired() {
      let dateSecoundAccess = Date.now();
      this.localDateTime = Number(localStorage.getItem("dateAccessPage"));
      let value = dateSecoundAccess - this.localDateTime;
      if (value >= (this.timeSession * 1000)) {
        this.authenticationService.logout();
      }
  }

  private initVerificationRedirect() {
    if(localStorage.getItem("dateAccessPage") && AuthenticationService.currentUser.token != ""){
      this.verifyTimeTokenExpired();
    }else{
      if(AuthenticationService.currentUser.token != '') {
        this.authenticationService.periodicIncrement(this.timeSession);
      } else {
        this.authenticateClient();
      }

    }

  }

  private redirectWithCodeUrl(code:string) {
    this.authenticationService.getUrlUser('/seguranca/url_security.json')
      .subscribe(resultado =>{
        AuthenticationService.port_server = resultado.port_server;
        var url = resultado.url;
        this.authenticationService.redirectUserTokenAccess(url, resultado.client_id, resultado.client_secret,code,
          resultado.grant_type, resultado.url_redirect)
          .subscribe(resultado => {
            this.authenticationService.findUser()
              .subscribe(result => {
                console.log('Funcionou!!!!!!!!!');
            });
          })
      });
  }

  private authenticateClient(){
    if(AuthenticationService.currentUser.token == '') {
      this.authenticationService.logout();
      this.authenticationService.getUrl('/seguranca/url_security.json')
        .subscribe (resultado => {
          window.location.href = resultado.url;
        });
    } else {
      this.authenticationService.getUrl('/seguranca/url_security.json')
        .subscribe (resultado => {
          if(resultado.store == 'variable'){
            AuthenticationService.currentUser.authorization = resultado.authorization;
            localStorage.removeItem('externalFile');
          }
        });
    }
  }


}
