import { OnDestroy } from '@angular/core';
export interface IEventListenr extends OnDestroy {
    ngOnDestroy(): void;
}
export declare class EventManagerService {
    private listeners;
    private subject;
    private eventObserver;
    constructor();
    registerEvent(eventName: string, eventListener: IEventListenr, callback: any): void;
    unregisterEvent(eventName: string, eventListener: IEventListenr): void;
    emit(name: string, ...args: any[]): void;
}
