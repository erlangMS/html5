import { OnInit } from '@angular/core';
import { Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
export declare class DefaultHeaders extends RequestOptions implements OnInit {
    static headers: Headers;
    constructor();
    ngOnInit(): void;
    merge(options?: RequestOptionsArgs): RequestOptions;
    setHeaders(name: string, value: string): void;
}
