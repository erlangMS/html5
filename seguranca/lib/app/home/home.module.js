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
var home_component_1 = require("./home.component");
var router_1 = require('@angular/router');
var login_component_1 = require("../login/login.component");
var forms_1 = require('@angular/forms');
var recaptcha_component_1 = require("../_recaptcha/recaptcha.component");
var event_amanger_service_1 = require("../_register/event.amanger.service");
var routes = [{ path: '', component: home_component_1.HomeComponent }];
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule
            ],
            declarations: [
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                recaptcha_component_1.RecaptchaComponent
            ],
            providers: [
                event_amanger_service_1.EventManagerService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map