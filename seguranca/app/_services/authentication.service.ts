import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import {DefaultHeaders} from "../_headers/default.headers";


@Injectable()
export class AuthenticationService {

  public token: any;

  public time: number = 0;
  intervalId: any = null;

  static client_secret:string = "";


  public static port_server:string = '';

   public static currentUser:any = {
    token: '',
    login: '',
    authorization: '',
    time: '',
    password: ''
  }

  constructor(private http: Http, private route: Router) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(url:string, body:string,authorization:string): Observable<boolean> {
    return this.http.post(url,body)
      .map((response: Response) => {
        let token =  response.json();
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify(response.json()));
          this.periodicIncrement(3600);
          return true;
        } else {
          return false;
        }
      });
  }


  getUrlUser(arquivo:string):Observable<any> {
    let arquivoExterno = localStorage.getItem('externalFile');
    if(arquivoExterno){
      arquivo = arquivoExterno;
    }
    return this.http.get(arquivo)
      .map((res) => {
        var json = res.json();
        return {url:json.find_user_client,client_id:json.client_id,client_secret:json.client_secret,grant_type:json.grant_type,
          url_redirect:json.url_redirect, port_client:json.port_client};
      });
  }

  getUrl(arquivo:string):Observable<any> {
    let arquivoExterno = localStorage.getItem('externalFile');
    if(arquivoExterno){
      arquivo = arquivoExterno;
    }
    return this.http.get(arquivo)
      .map((res) => {
        var json = res.json();
        let clientId = json.client_id;
        let location  = window.location.href.split(':');
        let url = location[0]+':'+location[1]+':'+DefaultHeaders.port+''+json.url_client+''+json.param_client+''+clientId+''+json.redirect_param+json.url_redirect;
        let body = json.body_client;
        AuthenticationService.client_secret = json.client_secret;
        let authorization = json.authorization;
        let store = json.store;
        return {url:url,body:body,authorization:authorization,store:store};
      });
  }


  redirectUserTokenAccess(url:string, client_id:string, client_secret:string,code:string,grant_type:string,
                          redirect_uri:string):Observable<boolean> {

    var obj = {
      client_id:client_id,
      client_secret:client_secret,
      code:code,
      redirect_uri:redirect_uri,
      grant_type:grant_type
    }
    let loc  = window.location.href.split(':');
    return this.http.post(loc[0]+':'+loc[1]+':'+DefaultHeaders.port+''+url+'?grant_type='+grant_type+'&client_id='+client_id+'&client_secret='+client_secret+'&code='+code+'&redirect_uri='+redirect_uri, JSON.stringify(obj))
      .map((resposta) => {
        var resp = resposta.json();
        AuthenticationService.currentUser.token = resp.access_token;
        localStorage.setItem('token',AuthenticationService.currentUser.token);
        this.periodicIncrement(3600);
         let localDateTime = Date.now();
        localStorage.setItem("dateAccessPage",localDateTime.toString());
        return true;
      });
  }


  getUrlForDirectLogin(login:string, senha: string,arquivo:string) {
    let arquivoExterno = localStorage.getItem('externalFile');
    if(arquivoExterno){
      arquivo = arquivoExterno;
    }
    return this.http.get(arquivo)
      .map((res) => {
        var json = res.json();
        let url = json.url_user+''+json.login+''+login+''+json.password+''+senha;
        let body = json.body_user;
        let authorization = json.authorization;
        return {url:url,body:body,authorization:authorization};
      });
  }


  periodicIncrement(sessionTime:number): void {
    this.cancelPeriodicIncrement();
    if(localStorage.getItem('dateAccessPage')){
      let timeAccess = Date.now();
      sessionTime = 3600000 - (timeAccess - Number(localStorage.getItem("dateAccessPage")));
      sessionTime = sessionTime/1000;
    }
    this.time = sessionTime * 1000;
    this.intervalId = setInterval(() => {
      if(this.time == 0 || !localStorage.getItem('token')){
        this.logout();
        return 0;
      }
      this.time = this.time - 1000;
      return this.time;
    }, 1000);

  };

  cancelPeriodicIncrement(): void {
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.time = 0;
    }
  };

  logout(): void {
    this.cancelPeriodicIncrement();
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem("dateAccessPage");
    localStorage.removeItem('user');
    AuthenticationService.currentUser = {
      token: '',
      login: '',
      authorization: '',
      time: '',
      password: ''
    }
    this.getUrl('/seguranca/url_security.json')
      .subscribe (resultado => {
        window.location.href = resultado.url;
      });
  }

  findUser() {
    return this.http.post('/recurso','')
      .map((response:Response) => {
        let resp = response.json();
        localStorage.setItem('user',resp.resource_owner);
      });
  }


}
