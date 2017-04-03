import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home.component";
import { Routes ,RouterModule } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import { FormsModule } from '@angular/forms';
import {RecaptchaComponent} from "../_recaptcha/recaptcha.component";
import {EventManagerService} from "../_register/event.amanger.service";

const routes: Routes = [{ path: '', component: HomeComponent}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    RecaptchaComponent
  ],
  providers: [
    EventManagerService
  ]
})
export class HomeModule {
}

