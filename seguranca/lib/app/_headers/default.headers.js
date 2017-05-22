"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var DefaultHeaders = (function (_super) {
    __extends(DefaultHeaders, _super);
    function DefaultHeaders() {
        _super.call(this);
    }
    DefaultHeaders.prototype.ngOnInit = function () {
    };
    DefaultHeaders.prototype.merge = function (options) {
        options.headers = DefaultHeaders.headers;
        var loc = window.location.href.split(':');
        var client_id = location.search.split('code=')[1];
        var name_api = loc[2].split('/');
        if (loc[0] == 'http') {
            DefaultHeaders.port = '2301';
        }
        else {
            DefaultHeaders.port = '2302';
        }
        if (localStorage.getItem('token')) {
            var verifyParams = [''];
            if (options.url != null) {
                verifyParams = options.url.split('?');
            }
            if (verifyParams[1] == undefined) {
                options.url = loc[0] + ':' + loc[1] + ':' + DefaultHeaders.port + '' + options.url + '?token=' + localStorage.getItem('token');
            }
            else {
                options.url = loc[0] + ':' + loc[1] + ':' + DefaultHeaders.port + '' + options.url + '&token=' + localStorage.getItem('token');
            }
        }
        var result = _super.prototype.merge.call(this, options);
        result.merge = this.merge;
        return result;
    };
    DefaultHeaders.prototype.setHeaders = function (name, value) {
        DefaultHeaders.headers.append(name, value);
    };
    DefaultHeaders.headers = new http_1.Headers({ 'content-type': 'application/json; charset=utf-8' });
    DefaultHeaders.port = '';
    DefaultHeaders = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DefaultHeaders);
    return DefaultHeaders;
}(http_1.RequestOptions));
exports.DefaultHeaders = DefaultHeaders;
//# sourceMappingURL=default.headers.js.map