import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {ListaComponent} from "./pessoa/lista/lista.component";
import {RodapeComponent} from "./rodape/rodape.component";
import {DefaultHeaders} from "./_headers/default.headers";
import {HomeModule} from "./home/home.module";
import {FormModule} from "./form/form.module";
import {PessoaModule} from "./pessoa/pessoa.module";
import {ErroModule} from "./erro/erro.module";
import {QuestaoModule} from "./questao/questao.module";


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    ListaComponent,
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
  providers: [AuthGuard, AuthenticationService,UserService,
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
