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
var redirect_service_1 = require("./_redirect/redirect.service");
var authentication_service_1 = require("./_services/authentication.service");
var SecurityComponent = (function () {
    function SecurityComponent(redirectService, authenticationService) {
        this.redirectService = redirectService;
        this.authenticationService = authenticationService;
    }
    SecurityComponent.prototype.ngOnInit = function () {
        var client_id = location.hash.split('code=')[1];
        if (client_id == undefined && this.authenticationService.currentUser.token == '') {
            this.redirectService.initVerificationRedirect();
        }
        else {
            this.redirectService.redirectWithCodeUrl(client_id);
        }
    };
    SecurityComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html'
        }), 
        __metadata('design:paramtypes', [redirect_service_1.RedirectService, authentication_service_1.AuthenticationService])
    ], SecurityComponent);
    return SecurityComponent;
}());
exports.SecurityComponent = SecurityComponent;
//# sourceMappingURL=app.component.js.map