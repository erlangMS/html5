import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-navigation',
  templateUrl: 'app/navigation/navigation.component.html',
  styleUrls: ['app/navigation/navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private name_user:string = '';

  constructor(private authenticationService: AuthenticationService) { }


  ngOnInit() {

  }

  logout(){
    this.authenticationService.logout();
  }

  verificarUsuarioLogado(){
    if(AuthenticationService.currentUser.token != ""){
      this.name_user = localStorage.getItem('user');
      return true;
    }else {
      return false;
    }
  }


}
