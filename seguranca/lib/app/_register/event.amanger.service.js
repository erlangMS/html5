"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var EventManagerService = (function () {
    function EventManagerService() {
        var _this = this;
        this.listeners = {};
        this.subject = new core_1.EventEmitter();
        this.eventObserver = this.subject.asObservable();
        this.eventObserver.subscribe(function (_a) {
            var name = _a.name, args = _a.args;
            if (_this.listeners[name]) {
                for (var _i = 0, _b = _this.listeners[name]; _i < _b.length; _i++) {
                    var listener = _b[_i];
                    listener.callback(args);
                }
            }
        });
    }
    EventManagerService.prototype.registerEvent = function (eventName, eventListener, callback) {
        if (!this.listeners[eventName])
            this.listeners[eventName] = [];
        var eventExist = false;
        for (var _i = 0, _a = this.listeners[eventName]; _i < _a.length; _i++) {
            var listener = _a[_i];
            if (listener.eventListener.constructor.name == eventListener.constructor.name) {
                eventExist = true;
                break;
            }
        }
        if (!eventExist) {
            this.listeners[eventName].push({ eventListener: eventListener, callback: callback });
        }
    };
    EventManagerService.prototype.unregisterEvent = function (eventName, eventListener) {
        if (this.listeners[eventName]) {
            for (var i = 0; i < this.listeners[eventName].length; i++) {
                if (this.listeners[eventName][i].eventListener.constructor.name == eventListener.constructor.name) {
                    this.listeners[eventName].splice(i, 1);
                    break;
                }
            }
        }
    };
    EventManagerService.prototype.emit = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.subject.next({ name: name, args: args });
    };
    EventManagerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EventManagerService);
    return EventManagerService;
}());
exports.EventManagerService = EventManagerService;
//# sourceMappingURL=event.amanger.service.js.map