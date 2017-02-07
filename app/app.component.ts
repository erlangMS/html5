import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {


 //verificar maneira melhor para remover do localStorage
  @HostListener('window:unload', ['$event'])
  beforeunloadHandler(event:any) {
    console.log();
    if(event.keyCode != 116) {
      localStorage.removeItem('currentUser');
    }
  }

}
