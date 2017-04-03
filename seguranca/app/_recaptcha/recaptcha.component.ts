import {Component, Input, OnInit } from '@angular/core';
import {EventManagerService} from "../_register/event.amanger.service";

@Component({
  selector: 're-captcha',
  template: '<div class="g-recaptcha" [attr.data-sitekey]="sitekey" data-callback="verified"></div>',
  styleUrls: ['app/_recaptcha/recaptcha.component.css']
})

export class RecaptchaComponent implements OnInit {

  @Input() sitekey:any;

  constructor( private eventManager: EventManagerService ){

  }

  ngOnInit(){
    this.render();
    window['verified'] = (response:any) => this.verified(response)
  }

  render(){
    var script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  verified(response:any){
    this.eventManager.emit('VALIDATE_CAPTCHA')
  }
}
