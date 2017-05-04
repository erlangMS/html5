import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, RequestOptionsArgs  } from '@angular/http';
import {AuthenticationService} from "../_services/authentication.service";

@Injectable()
export class DefaultHeaders extends RequestOptions implements OnInit {

    static headers: Headers  = new Headers({ 'content-type': 'application/json; charset=utf-8'});

    constructor() {
      super();

    }

    ngOnInit() {

    }

    merge(options?: RequestOptionsArgs): RequestOptions {
        options.headers = DefaultHeaders.headers;
        if(AuthenticationService.currentUser.token != "") {
          let location  = window.location.href.split(':');
          options.url = location[0]+':'+location[1]+':' + AuthenticationService.port_server +''+options.url+'?token=' + AuthenticationService.currentUser.token;
        }
        console.log(options.url);
      var result = super.merge(options);
        result.merge = this.merge;
        return result;
      }

    setHeaders(name: string, value: string) {
      DefaultHeaders.headers.append(name, value);
    }
}


