import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes ,RouterModule } from '@angular/router';
import {ErroComponent} from "./erro.component";

const routes: Routes = [{ path: '', component: ErroComponent}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ErroComponent
  ],
  providers: [
  ]
})
export class ErroModule {
}

