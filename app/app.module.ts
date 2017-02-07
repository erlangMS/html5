import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy, RequestOptions } from '@angular/http';

import { NavigationComponent } from './navigation/navigation.component';
import {routing, appRoutingProviders} from './app.routing';
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";

import { ErroComponent } from './erro/erro.component';
import {RodapeComponent} from "./rodape/rodape.component";
import {DefaultHeaders} from "./_headers/default.headers";
import {AppComponent} from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ErroComponent,
    RodapeComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [appRoutingProviders, AuthGuard, AuthenticationService,UserService,
    {
      provide: XSRFStrategy,
      useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRF-Token')
    },
    {
      provide: RequestOptions,
      useClass: DefaultHeaders
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
