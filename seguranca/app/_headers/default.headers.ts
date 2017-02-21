import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestOptionsArgs  } from '@angular/http';

@Injectable()
export class DefaultHeaders extends RequestOptions {

    static headers: Headers  = new Headers({ 'content-type': 'application/json; charset=utf-8'});

    constructor() {
      super();
      
      let usuario = JSON.parse(localStorage.getItem('currentUser'));
      if(usuario.access_token) {
        this.setHeaders("authorization", "Bearer "+usuario.access_token);
        //após remover do localStorage
      }
    }

    merge(options?: RequestOptionsArgs): RequestOptions {
        options.headers = DefaultHeaders.headers;
        console.log("Cabecalho   " + DefaultHeaders.headers);
        var result = super.merge(options);
        result.merge = this.merge;
        return result;
      }

    setHeaders(name: string, value: string) {
      DefaultHeaders.headers.append(name, value);
    }
}


