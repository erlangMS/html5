import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {

  public token: any;

  public time: number = 0;
  intervalId: any = null;


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


  getUrl(arquivo:string) {
    let arquivoExterno = localStorage.getItem('externalFile');
    if(arquivoExterno){
      arquivo = arquivoExterno;
    }
    return this.http.get(arquivo)
      .map((res) => {
        var json = res.json();
        let clientId = json.client_id;
        let url = json.url_client+''+clientId+''+json.redirect_param+json.url_redirect;
        let body = json.body_client;
        let authorization = json.authorization;
        localStorage.removeItem('externalFile');
        return {url:url,body:body,authorization:authorization};
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
        localStorage.removeItem('externalFile');
        return {url:url,body:body,authorization:authorization};
      });
  }


  periodicIncrement(sessionTime:number): void {
    this.cancelPeriodicIncrement();
    this.time = sessionTime * 1000;
    this.intervalId = setInterval(() => {
      if(this.time == 0){
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


  getSitemap() {
    return this.http.get('/arquitetura-basica/menu.json')
      .map((res) => {
        var sitemap = res.json();
         sessionStorage.setItem('menu',JSON.stringify(sitemap));
        return sitemap;
      });
  }

  logout(): void {
    this.cancelPeriodicIncrement();
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem("dateAccessPage");
    localStorage.removeItem('authorization');
    this.route.navigate(['']);
  }


}
