# Module Seguranca Angular

This module create a security front-end for your application, this module provides:
  
     abstraction for create a default headers for all requests.
     
     Services for autentication oauth 2 authorization.
     
     Session timer for your application.
     
     Framework for emit and subscribe.
     
     Framework for create a cookie (Beta developer)
     
     Include API for recapcha google (Disabled).
     
     Service for protect all your routes if user isn't autenticated.

     Control id user and redirect using file config.json


In the others versions many other functionalities are include in this securty module like:
    
    Create a component error customizable

    Create a pool of control ports and url external clients authorization


## Prerequisites

Node.js and npm are essential to development. 
    
in your project you have to run this command line

        npm install --save seguranca

## Use security module in your application

You have to configure systemjs.config.js add package security like describe above

(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'unbtemplate':                'npm:unbtemplate',
      'seguranca':                  'npm:seguranca',
      'hammerjs': 'npm:hammerjs/hammer.js',
      '@angular/material': 'npm:@angular/material/bundles/material.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      },
      unbtemplate: {
        main: './template.js',
        defaultExtension: 'js'
      },
      seguranca: {
        main: './seguranca.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);


You have to import this components in your AppModule

    import { NgModule }      from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { HttpModule } from '@angular/http';
    import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
    import { RequestOptions } from '@angular/http';

    import { AppComponent }  from './app.component';
    import {AuthenticationService, AuthGuard, RedirectService, DefaultHeaders, NavigationComponent} from 'seguranca';
    import { FileService } from './_file/file.service';

    @NgModule({
      imports: [ BrowserModule, HttpModule, FormsModule],
      declarations: [ AppComponent, NavigationComponent ],
      providers:    [ FileService, AuthenticationService, AuthGuard, RedirectService,
              {
                provide: RequestOptions,
                useClass: DefaultHeaders
              }
       ],
      bootstrap:    [ AppComponent ]
    })
    export class AppModule { }


After this you need to add this commands in AppComponent

    import { Component, OnInit } from '@angular/core';
    import { FileService } from './_file/file.service';
    import './rxjs-operators';

    @Component({
      selector: 'my-app',
        templateUrl: './app.html'
    })
    export class AppComponent implements OnInit  {

      constructor( private fileService: FileService) {
      }

      ngOnInit() {
        if(!localStorage.getItem('token')) {
          this.fileService.startRedirect ()
              .subscribe (resultado => {
              });
        }else {
          this.fileService.onlyRedirectService();
        }
      }
    }

After this create a file directory _file and create a file file.service.ts like this

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {RedirectService, DefaultHeaders} from 'seguranca';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FileService extends DefaultHeaders {

  constructor( private http: Http, private redirectService: RedirectService){
    super();
  }

  startRedirect():Observable<boolean> {
       return this.http.get('/config.json')
         .map((resultado) => {
           let result = resultado.json();
           let location  = window.location.href.split(':');
           let port = location[2].split('/')
           localStorage.setItem('externalFile',(window.location.protocol+'//'+window.location.hostname+':'+port[0]+'/config.json'));
           this.redirectService.startInitVerifySessionToken();
           return true;
         });
     }

    onlyRedirectService() {
        this.redirectService.startInitVerifySessionToken();
    }

}

create a file config.json inside a src if you use angular 4 and if use anguar2 in project folder

    {
      "url_client": "/authorize",
      "param_client": "?response_type=code&client_id=",
      "redirect_param": "&state=xyz%20&redirect_uri=",
      "body_client":"",
      "client_id": "154",
      "client_secret":"CPD",
      "url_redirect":"/unb-questionario/",
      "url_user": "/authorize?",
      "login": "grant_type=password&username=",
      "password": "&password=",
      "body_user" : "",
      "find_user_client": "/authorize/",
      "grant_type": "authorization_code",
      "port_client":"3000",
      "authorization":"Oauth2"
    }

Finally in index.html is important to configure the script for bootstrap get code

        <script>
             var client_id = location.search.split('code=')[1];
              if(client_id != undefined) {
                 client_id = client_id.split("&")[0];
              }
              System.import('main.js')
                .then(function() {
                  if(client_id != undefined){
                    history.pushState(client_id, "page 2", "/unb-questionario/?code="+client_id);
                  }
                })
                .catch(function(err){ console.error(err); });
           </script>

Now your application is totally configurate for use this module.
