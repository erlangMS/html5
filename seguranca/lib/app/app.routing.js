"use strict";
var router_1 = require('@angular/router');
exports.routes = [
    {
        "path": "home",
        "loadChildren": "app/home/home.module#HomeModule"
    },
    {
        "path": "form",
        "loadChildren": "app/form/form.module#FormModule"
    },
    {
        "path": "pessoa",
        "loadChildren": "app/pessoa/pessoa.module#PessoaModule"
    },
    {
        "path": "questao",
        "loadChildren": "app/questao/questao.module#QuestaoModule"
    },
    {
        "path": "erro",
        "loadChildren": "app/erro/erro.module#ErroModule"
    },
    {
        "path": "",
        "redirectTo": "home",
        "pathMatch": "full"
    }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routing.js.map