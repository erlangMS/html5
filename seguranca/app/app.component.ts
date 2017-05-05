import { Component, OnInit } from '@angular/core';
import {RedirectService} from "./_redirect/redirect.service";
import {AuthenticationService} from "./_services/authentication.service";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class SecurityComponent implements OnInit {

  constructor(private redirectService: RedirectService){

  }

  ngOnInit() {
    this.redirectService.startInitVerifySessionToken();
  }


}
