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
var common_1 = require('@angular/common');
var authentication_service_1 = require("./_services/authentication.service");
var AppComponent = (function () {
    function AppComponent(authenticationService, loc) {
        this.authenticationService = authenticationService;
        this.loc = loc;
        this.timeSession = 3600;
        this.client_id = 145;
        this.error = '';
        this.location = loc;
    }
    AppComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem("dateAccessPage")) {
            var dateSecoundAccess = Date.now();
            this.localDateTime = Number(localStorage.getItem("dateAccessPage"));
            var value = dateSecoundAccess - this.localDateTime;
            if (value >= (this.timeSession * 1000)) {
                this.authenticationService.logout();
            }
        }
        else {
            this.localDateTime = Date.now();
            localStorage.setItem("dateAccessPage", this.localDateTime.toString());
        }
        if (localStorage.getItem('currentUser')) {
            var sessionTime = JSON.parse(localStorage.getItem('currentUser'));
            this.authenticationService.periodicIncrement(this.timeSession);
        }
        else {
            this.authenticateClient();
        }
    };
    AppComponent.prototype.authenticateClient = function () {
        var _this = this;
        this.authenticationService.getUrl(this.client_id, '/seguranca/url_security.json')
            .subscribe(function (resultado) {
            _this.authenticationService.authenticateClient(resultado.url, resultado.body, resultado.authorization)
                .subscribe(function (result) {
                if (result === true) {
                    _this.error = '';
                    window.location.href = "http://127.0.0.1:2301/authorize?response_type=code&client_id=" + _this.client_id + "&state=xyz%20&redirect_uri=https://github.com/erlangMS/ems-bus";
                }
            }, function (err) {
                _this.error = 'Código de autenticação do cliente inválido.';
            });
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html'
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, common_1.Location])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map