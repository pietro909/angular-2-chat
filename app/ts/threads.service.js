"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ThreadsService = (function () {
    function ThreadsService(messagesService) {
        this.threads = messagesService.messages
            .map(function (messages) {
            var threads = [];
            messages.map(function (message) {
                threads[message.thread.id] = threads[message.thread.id] || message.thread;
                var messagesThread = threads[message.thread.id];
                if (!messagesThread.lastMessage || messagesThread.lastMessage.sentAt < message.sentAt) {
                    messagesThread.lastMessage = message;
                }
            });
            return threads;
        });
    }
    ThreadsService = __decorate([
        core_1.Injectable()
    ], ThreadsService);
    return ThreadsService;
}());
exports.ThreadsService = ThreadsService;
