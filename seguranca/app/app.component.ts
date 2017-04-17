import { Component, HostListener, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {AuthenticationService} from "./_services/authentication.service";
import {RedirectService} from "./_redirect/redirect.service";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class SecurityComponent implements OnInit {

  constructor(private redirectService: RedirectService){

  }

  ngOnInit() {
    this.redirectService.initVerificationRedirect();
  }

}
