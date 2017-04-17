import { Component, HostListener, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from "./_services/authentication.service";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit {

  public location: Location;

  public timeSession: number = 3600;

  private client_id:number = 145;

  public localDateTime: number;

  private error:string = '';

  constructor(private authenticationService: AuthenticationService, private loc: Location){
    this.location = loc;
  }

  ngOnInit() {
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
    this.authenticationService.getUrl(this.client_id,'/seguranca/url_security.json')
      .subscribe(resultado =>{
        this.authenticationService.authenticateClient(resultado.url, resultado.body,resultado.authorization)
          .subscribe (result => {
              if (result === true) {
                this.error = '';
                window.location.href = "http://127.0.0.1:2301/authorize?response_type=code&client_id="+this.client_id+"&state=xyz%20&redirect_uri=https://github.com/erlangMS/ems-bus";
              }
            },
            err => {
              this.error = 'Código de autenticação do cliente inválido.';
            }
          );
      });
  }

}
