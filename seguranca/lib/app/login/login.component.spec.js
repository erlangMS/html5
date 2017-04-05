"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require('@angular/core/testing');
var login_component_1 = require('./login.component');
var home_module_1 = require("../home/home.module");
describe('LoginComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [home_module_1.HomeModule]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(login_component_1.LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('verificar login válido', function () {
    });
});
//# sourceMappingURL=login.component.spec.js.map