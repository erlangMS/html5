import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {EventManagerService, IEventListenr} from "../_register/event.amanger.service";


@Component({
  selector: 'app-login',
  templateUrl: 'app/login/login.component.html',
  styleUrls: ['app/login/login.component.css']
})
export class LoginComponent implements OnInit, IEventListenr {

  private model: any = {};
  private loading = false;
  private error: string = '';
  private contadorLogin = 0;

  captchaAprovado = false;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private eventManager: EventManagerService) { }

  ngOnInit() {
    this.eventManager.registerEvent('VALIDATE_CAPTCHA',this,(args:any)=>{
      this.captchaAprovado = true;
      this.loading = false;
      let body = document.getElementById('login');
      body.classList.remove("disabled");
      this.contadorLogin = 4;

    });
  }

  ngOnDestroy(){

  }

  login() {
    this.loading = true;

      if(this.captchaAprovado || this.contadorLogin < 5) {

        this.authenticationService.getUrlForDirectLogin(this.model.username,this.model.password,'/seguranca/url_security.json')
          .subscribe(resultado =>{
            this.authenticationService.login (resultado.url, resultado.body,resultado.authorization)
              .subscribe (result => {
                  if (result === true) {
                    this.authenticationService.periodicIncrement (3600);
                    this.error = '';
                    window.location.href = "http://" + document.location.host + "/seguranca/";
                  }
                },
                err => {
                  this.error = 'Usuario e/ou senha inválida';
                  this.contadorLogin ++;
                  this.loading = false;
                  this.captchaAprovado = false;
                }
              );
          });
      }
  }


}
