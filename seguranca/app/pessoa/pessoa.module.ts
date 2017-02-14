import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes ,RouterModule } from '@angular/router';
import {AuthGuard} from "../_guards/auth.guard";
import {PessoaComponent} from "./pessoa.component";
import {ListaComponent} from "./lista/lista.component";
import {PessoaService} from "./pessoa.service";
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: PessoaComponent, canActivate: [AuthGuard]},
                        {path: 'pessoa/lista', component: ListaComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    PessoaComponent,
    ListaComponent
  ],
  providers: [
    PessoaService
  ]
})
export class PessoaModule {
}

