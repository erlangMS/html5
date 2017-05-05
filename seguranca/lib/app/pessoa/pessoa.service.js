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
var pessoa_1 = require("./pessoa");
var http_1 = require('@angular/http');
var router_1 = require("@angular/router");
var PessoaService = (function () {
    function PessoaService(http, route) {
        this.http = http;
        this.route = route;
    }
    PessoaService.prototype.insert = function (pessoa) {
        return this.http.post('/unb_aula/pessoa', pessoa, {})
            .map(function (response) {
            console.log(response.json());
            return new pessoa_1.Pessoa().fromJSON(response.json());
        });
    };
    PessoaService.prototype.findAluno = function () {
        return this.http.get("/academico/aluno", [])
            .map(function (response) { return console.log("Resposta da consulta:  " + response); });
    };
    PessoaService.prototype.find = function () {
        return this.http.get('/unb_aula/pessoa', {})
            .map(function (response) { return response.json(); });
    };
    PessoaService.prototype.redirecionarEditar = function (pessoa) {
        this.pessoa = pessoa;
        this.route.navigate(['/pessoa']);
    };
    PessoaService.prototype.update = function (pessoa) {
        return this.http.put('/unb_aula/pessoa/' + pessoa.id, pessoa, {})
            .map(function (response) {
            console.log(response.json());
            return new pessoa_1.Pessoa().fromJSON(response.json());
        });
    };
    PessoaService.prototype.delete = function (pessoa) {
        return this.http.delete('/unb_aula/pessoa/' + pessoa.id, {})
            .map(function (response) { return response.json(); });
    };
    PessoaService.prototype.findUser = function () {
        return this.http.post('/recurso', '')
            .map(function (response) {
            console.log(response.json());
        });
    };
    PessoaService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], PessoaService);
    return PessoaService;
}());
exports.PessoaService = PessoaService;
//# sourceMappingURL=pessoa.service.js.map