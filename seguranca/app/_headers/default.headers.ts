import { Injectable, OnInit } from '@angular/core';
import { Headers, RequestOptions, RequestOptionsArgs  } from '@angular/http';

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
        var result = super.merge(options);
        result.merge = this.merge;
        return result;
      }

    setHeaders(name: string, value: string) {
      DefaultHeaders.headers.append(name, value);
    }
}


