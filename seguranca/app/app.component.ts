import { Component, HostListener, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from "./_services/authentication.service";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit {

  public location: Location;

  public timeSession: number = 3600;

  public localDateTime: number;

  constructor(private authenticationService: AuthenticationService, private loc: Location){
    this.location = loc;
  }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      let sessionTime = JSON.parse(localStorage.getItem('currentUser'));
      this.authenticationService.periodicIncrement(this.timeSession);
    }

    if(localStorage.getItem("dateAccessPage")){
      let dateSecoundAccess = Date.now();
      this.localDateTime = Number(localStorage.getItem("dateAccessPage"));
      let value = dateSecoundAccess - this.localDateTime;
      if(value >= (this.timeSession * 1000)){
        this.authenticationService.logout();
      }

    }else{
      this.localDateTime = Date.now();
      localStorage.setItem("dateAccessPage",this.localDateTime.toString());
    }

  /* this.authenticationService.getIpClient().subscribe(result => {
      this.authenticationService.ip = result;
    });*/
  }

}
