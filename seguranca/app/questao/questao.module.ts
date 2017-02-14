import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes ,RouterModule } from '@angular/router';
import {AuthGuard} from "../_guards/auth.guard";
import {QuestaoComponent} from "./questao.component";
import {QuestaoService} from "./questao.service";
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: QuestaoComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    QuestaoComponent
  ],
  providers: [
    QuestaoService
  ]
})
export class QuestaoModule {
}

