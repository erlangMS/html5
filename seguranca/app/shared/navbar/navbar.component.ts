import { Component, Input, ChangeDetectionStrategy, Output } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
    selector: 'unb-navbar',
    templateUrl: 'app/shared/navbar/navbar.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

    @Input() brand: string;

    controlador:boolean=false;
    overlay:string="";

  @Input() menus:any = [{
      name: 'Início',
      icon: 'home',
      router: 'home',
      path:'home'
    }];

  private html: string ='';

    constructor(private http: Http, private router: Router){
      this.createTemplate();
    }

    carregarBars(){
      if(this.controlador){
        this.controlador =false;
        this.overlay = "none";
      }else{
        this.controlador =true;
        this.overlay = "block";
      }

    }

  createTemplate():Observable<any>{
    let path = localStorage.getItem('templateFile');
    return this.http.get(path)
      .map((res) => {
        this.menus = res.json().menu;
        for(var item in this.menus){
          this.html = this.html + '<li class="active"> <a  ng-reflect-router-link="'+this.menus[item].router+'" href="'+ this.menus[item].path +'">';
          this.html = this.html + '<i class="material-icons">'+ this.menus[item].icon +'</i> <span>'+ this.menus[item].name +'</span> </a> </li>';
        }
        let elemento = document.getElementById('navbar');
        elemento.innerHTML  = this.html;
        return this.menus;
      });
  }


}
