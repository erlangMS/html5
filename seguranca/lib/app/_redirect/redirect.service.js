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
var RedirectService = (function () {
    function RedirectService(authenticationService, loc) {
        this.authenticationService = authenticationService;
        this.loc = loc;
        this.timeSession = 3600;
        this.error = '';
        this.location = loc;
    }
    RedirectService.prototype.startInitVerifySessionToken = function () {
        if (localStorage.getItem('token')) {
            authentication_service_1.AuthenticationService.currentUser.token = localStorage.getItem('token');
        }
        if (localStorage.getItem("dateAccessPage") && authentication_service_1.AuthenticationService.currentUser.token != "") {
            this.verifyTimeTokenExpired();
        }
        var client_id = location.search.split('code=')[1];
        if (client_id == undefined) {
            if (authentication_service_1.AuthenticationService.currentUser.token == '') {
                this.initVerificationRedirect();
            }
            else {
                this.authenticationService.periodicIncrement(3600);
            }
        }
        else if (authentication_service_1.AuthenticationService.currentUser.token == '' && client_id != undefined) {
            this.redirectWithCodeUrl(client_id);
        }
    };
    RedirectService.prototype.ngOnDestroy = function () {
    };
    RedirectService.prototype.verifyTimeTokenExpired = function () {
        var dateSecoundAccess = Date.now();
        this.localDateTime = Number(localStorage.getItem("dateAccessPage"));
        var value = dateSecoundAccess - this.localDateTime;
        if (value >= (this.timeSession * 1000)) {
            this.authenticationService.logout();
        }
    };
    RedirectService.prototype.initVerificationRedirect = function () {
        if (localStorage.getItem("dateAccessPage") && authentication_service_1.AuthenticationService.currentUser.token != "") {
            this.verifyTimeTokenExpired();
        }
        else {
            if (authentication_service_1.AuthenticationService.currentUser.token != '') {
                this.authenticationService.periodicIncrement(this.timeSession);
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
                _this.authenticationService.findUser()
                    .subscribe(function (result) {
                });
            });
        });
    };
    RedirectService.prototype.authenticateClient = function () {
        if (authentication_service_1.AuthenticationService.currentUser.token == '') {
            this.authenticationService.logout();
            this.authenticationService.getUrl('/seguranca/url_security.json')
                .subscribe(function (resultado) {
                var url_parts = resultado.url;
                window.location.href = resultado.url;
            });
        }
        else {
            this.authenticationService.getUrl('/seguranca/url_security.json')
                .subscribe(function (resultado) {
                if (resultado.store == 'variable') {
                    authentication_service_1.AuthenticationService.currentUser.authorization = resultado.authorization;
                }
            });
        }
    };
    RedirectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, common_1.Location])
    ], RedirectService);
    return RedirectService;
}());
exports.RedirectService = RedirectService;
//# sourceMappingURL=redirect.service.js.map