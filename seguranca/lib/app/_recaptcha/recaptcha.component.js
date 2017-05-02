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
var event_amanger_service_1 = require("../_register/event.amanger.service");
var RecaptchaComponent = (function () {
    function RecaptchaComponent(eventManager) {
        this.eventManager = eventManager;
    }
    RecaptchaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.render();
        window['verified'] = function (response) { return _this.verified(response); };
    };
    RecaptchaComponent.prototype.render = function () {
        var script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    };
    RecaptchaComponent.prototype.verified = function (response) {
        this.eventManager.emit('VALIDATE_CAPTCHA');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RecaptchaComponent.prototype, "sitekey", void 0);
    RecaptchaComponent = __decorate([
        core_1.Component({
            selector: 're-captcha',
            template: '<div class="g-recaptcha" [attr.data-sitekey]="sitekey" data-callback="verified"></div>',
            styleUrls: ['app/_recaptcha/recaptcha.component.css']
        }), 
        __metadata('design:paramtypes', [event_amanger_service_1.EventManagerService])
    ], RecaptchaComponent);
    return RecaptchaComponent;
}());
exports.RecaptchaComponent = RecaptchaComponent;
//# sourceMappingURL=recaptcha.component.js.map