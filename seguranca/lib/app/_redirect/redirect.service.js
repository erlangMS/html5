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
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var authentication_service_1 = require("../_services/authentication.service");
var router_1 = require('@angular/router');
var RedirectService = (function () {
    function RedirectService(authenticationService, loc, activatedRoute) {
        this.authenticationService = authenticationService;
        this.loc = loc;
        this.activatedRoute = activatedRoute;
        this.timeSession = 3600;
        this.error = '';
        this.location = loc;
    }
    RedirectService.prototype.initVerificationRedirect = function () {
        if (sessionStorage.getItem("dateAccessPage") && this.authenticationService.currentUser.token != "") {
            var dateSecoundAccess = Date.now();
            this.localDateTime = Number(sessionStorage.getItem("dateAccessPage"));
            var value = dateSecoundAccess - this.localDateTime;
            if (value >= (this.timeSession * 3600)) {
                this.authenticationService.logout();
            }
        }
        else {
            if (this.authenticationService.currentUser.token) {
                this.authenticationService.periodicIncrement(3600);
                this.localDateTime = Date.now();
                sessionStorage.setItem("dateAccessPage", this.localDateTime.toString());
            }
            else {
                this.authenticateClient();
            }
        }
    };
    RedirectService.prototype.redirectWithCodeUrl = function (code) {
        var _this = this;
        this.authenticationService.getUrlUser('/seguranca/url_security.json')
            .subscribe(function (resultado) {
            var url = resultado.url;
            _this.authenticationService.redirectUserTokenAccess(url, resultado.client_id, resultado.client_secret, code, resultado.grant_type, resultado.url_redirect)
                .subscribe(function (resultado) {
                console.log('Funcionou !!');
            });
        });
    };
    RedirectService.prototype.authenticateClient = function () {
        var _this = this;
        if (this.authenticationService.currentUser.token == '') {
            this.authenticationService.logout();
            this.authenticationService.getUrl('/seguranca/url_security.json')
                .subscribe(function (resultado) {
                window.location.href = resultado.url;
            });
        }
        else {
            this.authenticationService.getUrl('/seguranca/url_security.json')
                .subscribe(function (resultado) {
                if (resultado.store == 'variable') {
                    _this.authenticationService.currentUser.authorization = resultado.authorization;
                    localStorage.removeItem('externalFile');
                }
            });
        }
    };
    RedirectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, common_1.Location, router_1.ActivatedRoute])
    ], RedirectService);
    return RedirectService;
}());
exports.RedirectService = RedirectService;
//# sourceMappingURL=redirect.service.js.map