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
var authentication_service_1 = require("../_services/authentication.service");
var DefaultHeaders = (function (_super) {
    __extends(DefaultHeaders, _super);
    function DefaultHeaders() {
        _super.call(this);
    }
    DefaultHeaders.prototype.ngOnInit = function () {
    };
    DefaultHeaders.prototype.merge = function (options) {
        options.headers = DefaultHeaders.headers;
        if (authentication_service_1.AuthenticationService.currentUser.token != "") {
            var location_1 = window.location.href.split(':');
            options.url = location_1[0] + ':' + location_1[1] + ':' + authentication_service_1.AuthenticationService.port_server + '' + options.url + '?token=' + authentication_service_1.AuthenticationService.currentUser.token;
        }
        var result = _super.prototype.merge.call(this, options);
        result.merge = this.merge;
        return result;
    };
    DefaultHeaders.prototype.setHeaders = function (name, value) {
        DefaultHeaders.headers.append(name, value);
    };
    DefaultHeaders.headers = new http_1.Headers({ 'content-type': 'application/json; charset=utf-8' });
    DefaultHeaders = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DefaultHeaders);
    return DefaultHeaders;
}(http_1.RequestOptions));
exports.DefaultHeaders = DefaultHeaders;
//# sourceMappingURL=default.headers.js.map