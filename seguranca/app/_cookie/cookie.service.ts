import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor() {

  }

   getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = name + "=";
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s\+/g, "");
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "";
  }

   deleteCookie(name: string) {
    this.setCookieForRemove(name, "", -1);
  }


  private setCookieForRemove(name: string, value: string, expireMilisecounds: number) {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireMilisecounds);
    let expires: string = "expires="+d.toUTCString();
    document.cookie = name +"="+value+";"+expires;
  }

   setCookie(name: string, value: string, expireMilisecounds: number, path: string, domain: string, secure: boolean)  {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireMilisecounds );
    let expires:string =  d.toUTCString();

     document.cookie = name + "=" +value +
       ( ( expires ) ? ";expires=" + expires : "" ) +
       ( ( path ) ? ";path=" + path : "" ) +
       ( ( domain ) ? ";domain=" + domain : "" ) +
       ( ( secure ) ? ";secure" : "" );
       
  }

}
