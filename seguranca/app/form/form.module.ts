import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes ,RouterModule } from '@angular/router';
import {FormComponent} from "./form.component";
import {AuthGuard} from "../_guards/auth.guard";
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: FormComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    FormComponent
  ],
  providers: [
  ]
})
export class FormModule {
}

