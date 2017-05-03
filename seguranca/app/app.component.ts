import { Component, HostListener, OnInit } from '@angular/core';
import {RedirectService} from "./_redirect/redirect.service";
import {AuthenticationService} from "./_services/authentication.service";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class SecurityComponent implements OnInit {

  constructor(private redirectService: RedirectService, private authenticationService:AuthenticationService){

  }

  ngOnInit() {
    var client_id = location.hash.split('code=')[1];
    if(client_id == undefined && this.authenticationService.currentUser.token == ''){
      this.redirectService.initVerificationRedirect();
    } else {
      this.redirectService.redirectWithCodeUrl(client_id);
    }
  }

}
