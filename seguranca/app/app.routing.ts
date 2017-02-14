import { Routes ,RouterModule } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';

export const routes: Routes = [
  {
    "path":  "home",
    "loadChildren" : "app/home/home.module#HomeModule"
  },
  {
    "path":"form",
    "loadChildren": "app/form/form.module#FormModule"
  },
  {
    "path":"pessoa",
    "loadChildren": "app/pessoa/pessoa.module#PessoaModule"
  },
  {
    "path":"questao",
    "loadChildren": "app/questao/questao.module#QuestaoModule"
  },
  {
    "path":"erro",
    "loadChildren": "app/erro/erro.module#ErroModule"
  },
  {
    "path": "" ,
    "redirectTo": "home",
    "pathMatch": "full"
  }

];
export const routing: ModuleWithProviders  = RouterModule.forRoot(routes);
