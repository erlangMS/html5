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
var http_1 = require('@angular/http');
var router_1 = require("@angular/router");
require('rxjs/add/operator/map');
var default_headers_1 = require("../_headers/default.headers");
var AuthenticationService = (function () {
    function AuthenticationService(http, route) {
        this.http = http;
        this.route = route;
        this.time = 0;
        this.intervalId = null;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    AuthenticationService.prototype.login = function (url, body, authorization) {
        var _this = this;
        return this.http.post(url, body)
            .map(function (response) {
            var token = response.json();
            if (token) {
                _this.token = token;
                localStorage.setItem('currentUser', JSON.stringify(response.json()));
                _this.periodicIncrement(3600);
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.getUrlUser = function (arquivo) {
        var arquivoExterno = localStorage.getItem('externalFile');
        if (arquivoExterno) {
            arquivo = arquivoExterno;
        }
        return this.http.get(arquivo)
            .map(function (res) {
            var json = res.json();
            return { url: json.find_user_client, client_id: json.client_id, client_secret: json.client_secret, grant_type: json.grant_type,
                url_redirect: json.url_redirect, port_client: json.port_client };
        });
    };
    AuthenticationService.prototype.getUrl = function (arquivo) {
        var arquivoExterno = localStorage.getItem('externalFile');
        if (arquivoExterno) {
            arquivo = arquivoExterno;
        }
        return this.http.get(arquivo)
            .map(function (res) {
            var json = res.json();
            var clientId = json.client_id;
            var location = window.location.href.split(':');
            var url = location[0] + ':' + location[1] + ':' + default_headers_1.DefaultHeaders.port + '' + json.url_client + '' + json.param_client + '' + clientId + '' + json.redirect_param + json.url_redirect;
            var body = json.body_client;
            AuthenticationService.client_secret = json.client_secret;
            var authorization = json.authorization;
            var store = json.store;
            return { url: url, body: body, authorization: authorization, store: store };
        });
    };
    AuthenticationService.prototype.redirectUserTokenAccess = function (url, client_id, client_secret, code, grant_type, redirect_uri) {
        var _this = this;
        var obj = {
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            redirect_uri: redirect_uri,
            grant_type: grant_type
        };
        var loc = window.location.href.split(':');
        return this.http.post(loc[0] + ':' + loc[1] + ':' + default_headers_1.DefaultHeaders.port + '' + url + '?grant_type=' + grant_type + '&client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + code + '&redirect_uri=' + redirect_uri, JSON.stringify(obj))
            .map(function (resposta) {
            var resp = resposta.json();
            AuthenticationService.currentUser.token = resp.access_token;
            localStorage.setItem('token', AuthenticationService.currentUser.token);
            _this.periodicIncrement(3600);
            var localDateTime = Date.now();
            localStorage.setItem("dateAccessPage", localDateTime.toString());
            return true;
        });
    };
    AuthenticationService.prototype.getUrlForDirectLogin = function (login, senha, arquivo) {
        var arquivoExterno = localStorage.getItem('externalFile');
        if (arquivoExterno) {
            arquivo = arquivoExterno;
        }
        return this.http.get(arquivo)
            .map(function (res) {
            var json = res.json();
            var url = json.url_user + '' + json.login + '' + login + '' + json.password + '' + senha;
            var body = json.body_user;
            var authorization = json.authorization;
            return { url: url, body: body, authorization: authorization };
        });
    };
    AuthenticationService.prototype.periodicIncrement = function (sessionTime) {
        var _this = this;
        this.cancelPeriodicIncrement();
        if (localStorage.getItem('dateAccessPage')) {
            var timeAccess = Date.now();
            sessionTime = 3600000 - (timeAccess - Number(localStorage.getItem("dateAccessPage")));
            sessionTime = sessionTime / 1000;
        }
        this.time = sessionTime * 1000;
        this.intervalId = setInterval(function () {
            if (_this.time == 0 || !localStorage.getItem('token')) {
                _this.logout();
                return 0;
            }
            _this.time = _this.time - 1000;
            return _this.time;
        }, 1000);
    };
    ;
    AuthenticationService.prototype.cancelPeriodicIncrement = function () {
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.time = 0;
        }
    };
    ;
    AuthenticationService.prototype.logout = function () {
        this.cancelPeriodicIncrement();
        this.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem("dateAccessPage");
        localStorage.removeItem('user');
        AuthenticationService.currentUser = {
            token: '',
            login: '',
            authorization: '',
            time: '',
            password: ''
        };
        this.getUrl('/seguranca/url_security.json')
            .subscribe(function (resultado) {
            window.location.href = resultado.url;
        });
    };
    AuthenticationService.prototype.findUser = function () {
        return this.http.post('/recurso', '')
            .map(function (response) {
            var resp = response.json();
            localStorage.setItem('user', resp.resource_owner);
        });
    };
    AuthenticationService.client_secret = "";
    AuthenticationService.port_server = '';
    AuthenticationService.currentUser = {
        token: '',
        login: '',
        authorization: '',
        time: '',
        password: ''
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map