"use strict";
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
var CookieService = (function () {
    function CookieService() {
    }
    CookieService.prototype.getCookie = function (name) {
        var ca = document.cookie.split(';');
        var caLen = ca.length;
        var cookieName = name + "=";
        var c;
        for (var i = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s\+/g, "");
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return "";
    };
    CookieService.prototype.deleteCookie = function (name) {
        this.setCookieForRemove(name, "", -1);
    };
    CookieService.prototype.setCookieForRemove = function (name, value, expireMilisecounds) {
        var d = new Date();
        d.setTime(d.getTime() + expireMilisecounds);
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires;
    };
    CookieService.prototype.setCookie = function (name, value, expireMilisecounds, path, domain, secure) {
        var d = new Date();
        d.setTime(d.getTime() + expireMilisecounds);
        var expires = d.toUTCString();
        document.cookie = name + "=" + value +
            ((expires) ? ";expires=" + expires : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") +
            ((secure) ? ";secure" : "");
    };
    CookieService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CookieService);
    return CookieService;
}());
exports.CookieService = CookieService;
//# sourceMappingURL=cookie.service.js.map