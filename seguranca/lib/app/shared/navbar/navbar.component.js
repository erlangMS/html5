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
var router_1 = require('@angular/router');
require('rxjs/add/operator/map');
var NavbarComponent = (function () {
    function NavbarComponent(http, router) {
        this.http = http;
        this.router = router;
        this.controlador = false;
        this.overlay = "";
        this.menus = [{
                name: 'Início',
                icon: 'home',
                router: 'home',
                path: 'home'
            }];
        this.html = '';
        this.createTemplate();
    }
    NavbarComponent.prototype.carregarBars = function () {
        if (this.controlador) {
            this.controlador = false;
            this.overlay = "none";
        }
        else {
            this.controlador = true;
            this.overlay = "block";
        }
    };
    NavbarComponent.prototype.createTemplate = function () {
        var _this = this;
        var path = localStorage.getItem('templateFile');
        return this.http.get(path)
            .map(function (res) {
            _this.menus = res.json().menu;
            for (var item in _this.menus) {
                _this.html = _this.html + '<li class="active"> <a  ng-reflect-router-link="' + _this.menus[item].router + '" href="' + _this.menus[item].path + '">';
                _this.html = _this.html + '<i class="material-icons">' + _this.menus[item].icon + '</i> <span>' + _this.menus[item].name + '</span> </a> </li>';
            }
            var elemento = document.getElementById('navbar');
            elemento.innerHTML = _this.html;
            return _this.menus;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NavbarComponent.prototype, "brand", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NavbarComponent.prototype, "menus", void 0);
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'unb-navbar',
            templateUrl: './node_modules/seguranca/app/shared/navbar/navbar.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map