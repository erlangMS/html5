import { OnDestroy, EventEmitter, Injectable } from '@angular/core';

export interface IEventListenr extends OnDestroy{
  ngOnDestroy(): void
}

@Injectable()
export class EventManagerService {


  private listeners = {};
  private subject = new EventEmitter();
  private eventObserver = this.subject.asObservable();


  constructor() {

    this.eventObserver.subscribe(({name,args})=>{



      if(this.listeners[name])
      {
        for(let listener of this.listeners[name])
        {
          listener.callback(args);
        }
      }
    })

  }

  public registerEvent(eventName:string,eventListener:IEventListenr,callback:any)
  {

    if(!this.listeners[eventName])
      this.listeners[eventName] = [];

    let eventExist = false;
    for(let listener of this.listeners[eventName])
    {

      if(listener.eventListener.constructor.name==eventListener.constructor.name)
      {
        eventExist = true;
        break;
      }
    }

    if(!eventExist)
    {
      this.listeners[eventName].push({eventListener,callback});
    }
  }

  public unregisterEvent(eventName:string,eventListener:IEventListenr)
  {

    if(this.listeners[eventName])
    {
      for(let i = 0; i<this.listeners[eventName].length;i++)
      {

        if(this.listeners[eventName][i].eventListener.constructor.name==eventListener.constructor.name)
        {
          this.listeners[eventName].splice(i, 1);
          break;
        }
      }
    }


  }


  emit(name:string,...args:any[])
  {
    this.subject.next({name,args});
  }
}
