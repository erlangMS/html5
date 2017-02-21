import { Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
export declare class DefaultHeaders extends RequestOptions {
    static headers: Headers;
    constructor();
    merge(options?: RequestOptionsArgs): RequestOptions;
    setHeaders(name: string, value: string): void;
}
