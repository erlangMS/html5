import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
  private isConsented: boolean = false;

  private secure: string;

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

   setCookie(name: string, value: string, expireMilisecounds: number, path: string = "", domain: string = "") {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireMilisecounds );
    let expires:string = "expires=" + d.toUTCString();
    document.cookie =  + expires + ",path=" +path+","+this.secure+",httponly,"+name + "=" + value;
     console.log("Cookie criardo   "+document.cookie);
  }

  setSecurityCookie(security: boolean) {
    if(security) {
      this.secure = "secure";
    } else {
      this.secure = "";
    }
  }

}
