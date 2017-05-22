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
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var app_component_1 = require('./app.component');
var navigation_component_1 = require('./navigation/navigation.component');
var auth_guard_1 = require("./_guards/auth.guard");
var authentication_service_1 = require("./_services/authentication.service");
var user_service_1 = require("./_services/user.service");
var rodape_component_1 = require("./rodape/rodape.component");
var default_headers_1 = require("./_headers/default.headers");
var home_module_1 = require("./home/home.module");
var form_module_1 = require("./form/form.module");
var pessoa_module_1 = require("./pessoa/pessoa.module");
var erro_module_1 = require("./erro/erro.module");
var questao_module_1 = require("./questao/questao.module");
var app_routing_1 = require("./app.routing");
var cookie_service_1 = require("./_cookie/cookie.service");
var redirect_service_1 = require("./_redirect/redirect.service");
var navbar_module_1 = require("./shared/navbar/navbar.module");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.SecurityComponent,
                navigation_component_1.NavigationComponent,
                rodape_component_1.RodapeComponent
            ],
            imports: [
                http_1.HttpModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                home_module_1.HomeModule,
                form_module_1.FormModule,
                pessoa_module_1.PessoaModule,
                erro_module_1.ErroModule,
                questao_module_1.QuestaoModule,
                navbar_module_1.NavbarModule,
                app_routing_1.routing
            ],
            providers: [auth_guard_1.AuthGuard, authentication_service_1.AuthenticationService, user_service_1.UserService, cookie_service_1.CookieService, redirect_service_1.RedirectService,
                {
                    provide: http_1.XSRFStrategy,
                    useValue: new http_1.CookieXSRFStrategy('csrftoken', 'X-CSRF-Token')
                },
                {
                    provide: http_1.RequestOptions,
                    useClass: default_headers_1.DefaultHeaders
                },
                {
                    provide: common_1.LocationStrategy,
                    useClass: common_1.HashLocationStrategy
                }
            ],
            bootstrap: [app_component_1.SecurityComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map