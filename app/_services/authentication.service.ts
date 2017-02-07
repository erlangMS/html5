import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService  {

  public token: string;

  public time: number = 0;
  intervalId: any = null;

  constructor(private http: Http, private route: Router) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(url:string, body:string): Observable<boolean> {
    return this.http.post(url,body)
      .map((response: Response) => {
        let token = response.json() && response.json();
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify(response.json()));
          let sessionTime = JSON.parse(localStorage.getItem('currentUser'));
          this.periodicIncrement(sessionTime.expires_in);
          return true;
        } else {
          return false;
        }
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
    return this.http.get('/seguranca/menu.json')
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
    this.route.navigate(['']);
  }

}
