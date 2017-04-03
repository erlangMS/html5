import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy, RequestOptions, Http } from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {RodapeComponent} from "./rodape/rodape.component";
import {DefaultHeaders} from "./_headers/default.headers";
import {HomeModule} from "./home/home.module";
import {FormModule} from "./form/form.module";
import {PessoaModule} from "./pessoa/pessoa.module";
import {ErroModule} from "./erro/erro.module";
import {QuestaoModule} from "./questao/questao.module";
import {routing} from "./app.routing";
import {CookieService} from "./_cookie/cookie.service";


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RodapeComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    HomeModule,
    FormModule,
    PessoaModule,
    ErroModule,
    QuestaoModule,
    routing
  ],
  providers: [AuthGuard, AuthenticationService,UserService, CookieService,
    {
      provide: XSRFStrategy,
      useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRF-Token')
    },
    {
      provide: RequestOptions,
      useClass: DefaultHeaders
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
