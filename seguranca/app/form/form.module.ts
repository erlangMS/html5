import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes ,RouterModule } from '@angular/router';
import {FormComponent} from "./form.component";
import {AuthGuard} from "../_guards/auth.guard";

const routes: Routes = [{ path: '', component: FormComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FormComponent
  ],
  providers: [
  ]
})
export class FormModule {
}

