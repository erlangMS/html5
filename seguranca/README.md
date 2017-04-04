# Module Seguranca Angular

This module create a security front-end for your application, this module provides:
  
     abstraction for create a default headers for all requests.
     
     Services for autentication with any tipe of authorization.
     
     Session timer for your application.
     
     Framework for emit and subscribe.
     
     Framework for create a cookie (Beta developer)
     
     Include API for recapcha google.
     
     Service for protect all your routes if user isn't autenticated.

In the others versions many other functionalities are include in this securty module like:
    
    Auitomatic request for reautenticated user when looged in the same pc
    
    Control of IP user
   
    Id for register client 
    
    Create components for login 
    
    Create a component error customizable
    
    Crate a dinamically routes based in json.

## Prerequisites

Node.js and npm are essential to development. 
    
in your project you have to run this command line

        npm install seguranca
        npm install -g typings webpack rimraf webpack

## Use security module in your application

You have to import this components in your AppModule

    import { NgModule } from '@angular/core';
    import { AppComponent } from './app.component';
    import { routing } from './app.routing';
    import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
    import { BrowserModule  } from '@angular/platform-browser';
    import { HttpModule, JsonpModule } from '@angular/http';
    import { NavigationComponent, AuthenticationService, AuthGuard, ErroComponent } from 'seguranca';

    @NgModule({
       declarations: [
          AppComponent,
          NavigationComponent,
          ErroComponent
     ],
     imports: [
         HttpModule,
         FormsModule,
         BrowserModule,
         routing
     ],
      providers: [
        AuthenticationService,
        AuthGuard
       ],
       bootstrap: [ AppComponent ]
     })
     export class AppModule {
    }

After this you need to implement, in this version, a LoginComponent and integrate with AuthorizationService for use all the functionalities in security module. In another versions this isn't need to do, the framework will provide a login page dinamically and configurable.
     
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
        });
      }

      ngOnDestroy(){

      }

      login() {
        this.loading = true;

          if(this.captchaAprovado || this.contadorLogin < 5) {
             this.authenticationService.login ("http://127.0.0.1:2301/authorize?grant_type=password&username=" + this.model.username +   "&password=" + this.model.password, '')
            .subscribe (result => {
                  this.authenticationService.periodicIncrement (3600);
                  this.error = '';
                  window.location.href = "http://" + document.location.host + "/seguranca/";
                }
              },
              err => {
                this.error = 'Usuario e/ou senha inválida';
                this.contadorLogin ++;
                this.loading = false;
              }
            );
        }
      }
    }

This is a initial security framework for Angular, this implements some requisits presents in documentation Angular.io
