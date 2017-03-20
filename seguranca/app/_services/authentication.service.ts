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

  private url: string;
  private body: string;

  public ip: any;


  constructor(private http: Http, private route: Router) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
  }

  login(url:string, body:string): Observable<boolean> {
    return this.http.post(url,body)
      .map((response: Response) => {
        let token =  response.json();
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify(response.json()));
          localStorage.setItem('adressIp',JSON.stringify({ip: this.ip}));
          this.periodicIncrement(3600);
          return true;
        } else {
          return false;
        }
      });
  }

  getUrl(login:string, senha: string) {
    return this.http.get('/arquitetura-basica/url_security.json')
      .map((res) => {
        var json = res.json();
        this.url = json.url+''+json.param1+''+login+''+json.param2+''+senha;
        this.body = json.body;
        return this.url;
      });
  }

  /*Verificar método para recuperar ip da máquina
  getIpClient(){
    return this.http.get('')
      .map((res) => {
        return res;
      });
  }*/

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
    this.route.navigate(['']);
  }


}
