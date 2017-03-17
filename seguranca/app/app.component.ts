import { Component, HostListener, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from "./_services/authentication.service";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit {

  public location: Location;

  constructor(private authenticationService: AuthenticationService, private loc: Location){
    this.location = loc;
  }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      let sessionTime = JSON.parse(localStorage.getItem('currentUser'));
      this.authenticationService.periodicIncrement(3600);
    }

  /* this.authenticationService.getIpClient().subscribe(result => {
      this.authenticationService.ip = result;
    });*/
  }

  /*@HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(e:any) {
    localStorage.removeItem('currentUser');
  }*/

}
