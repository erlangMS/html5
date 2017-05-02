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
var router_1 = require('@angular/router');
var form_component_1 = require("./form.component");
var auth_guard_1 = require("../_guards/auth.guard");
var forms_1 = require('@angular/forms');
var routes = [{ path: '', component: form_component_1.FormComponent, canActivate: [auth_guard_1.AuthGuard] }];
var FormModule = (function () {
    function FormModule() {
    }
    FormModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule
            ],
            declarations: [
                form_component_1.FormComponent
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], FormModule);
    return FormModule;
}());
exports.FormModule = FormModule;
//# sourceMappingURL=form.module.js.map