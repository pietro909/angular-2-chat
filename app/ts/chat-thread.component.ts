import {Component, OnInit} from '@angular/core';
import {Thread} from './thread.model';
import {ThreadsService} from './services/threads.service';

@Component({
    inputs: ['thread'],
    selector: 'chat-thread',
    template: `
    <div class="media conversation">
        <div class="pull-left">
            <img class="media-object avatar"
                 src="{{thread.avatarSrc}}">
         </div>
         <div class="media-body">
            <h5 class="media-heading contact-name">{{thread.name}}
                <span *ngIf="selected">&bull;</span>
            </h5>
            <small class="message-preview">{{thread.lastMessage.text}}</small>
        </div>
        <a (click)="clicked($event)" class="div-link">Select</a>
     </div>
    `
})
export class ChatThread implements OnInit {

    thread: Thread;

    selected: boolean = false;

    constructor(public threadsService: ThreadsService) {
        // inputs properties are not available in the constructor
    }

    ngOnInit(): void {
        this.threadsService.currentThread
            .subscribe((currentThread: Thread) => {
                this.selected = currentThread &&
                    this.thread &&
                    (currentThread.id === this.thread.id);
            });
    }

    clicked(event: any): void {
        this.threadsService.setCurrentThread(this.thread);
        event.preventDefault();
    }
}
