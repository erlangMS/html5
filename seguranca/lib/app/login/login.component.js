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
var router_1 = require('@angular/router');
var authentication_service_1 = require('../_services/authentication.service');
var event_amanger_service_1 = require("../_register/event.amanger.service");
var LoginComponent = (function () {
    function LoginComponent(router, authenticationService, eventManager) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.eventManager = eventManager;
        this.model = {};
        this.loading = false;
        this.error = '';
        this.contadorLogin = 0;
        this.captchaAprovado = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventManager.registerEvent('VALIDATE_CAPTCHA', this, function (args) {
            _this.captchaAprovado = true;
            _this.loading = false;
            var body = document.getElementById('login');
            body.classList.remove("disabled");
            _this.contadorLogin = 4;
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        if (this.captchaAprovado || this.contadorLogin < 5) {
            this.authenticationService.getUrlForDirectLogin(this.model.username, this.model.password, '/seguranca/url_security.json')
                .subscribe(function (resultado) {
                _this.authenticationService.login(resultado.url, resultado.body, resultado.authorization)
                    .subscribe(function (result) {
                    if (result === true) {
                        _this.authenticationService.periodicIncrement(3600);
                        _this.error = '';
                        window.location.href = "http://" + document.location.host + "/seguranca/";
                    }
                }, function (err) {
                    _this.error = 'Usuario e/ou senha inválida';
                    _this.contadorLogin++;
                    _this.loading = false;
                    _this.captchaAprovado = false;
                });
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: 'app/login/login.component.html',
            styleUrls: ['app/login/login.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, authentication_service_1.AuthenticationService, event_amanger_service_1.EventManagerService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map