import {Component, OnInit} from '@angular/core';
import {FromNowPipe} from './util/FromNowPipe';
import {User} from './user.model';
import {Message} from './message.model';
import {UserService} from './services/user.service';

@Component({
    inputs: ['message'],
    selector: 'chat-message',
    pipes: [FromNowPipe],
    template: `
    <div class="msg-container"
        [ngClass]="{'base-sent': !incoming, 'base-receive': incoming}">
        <div class="avatar"
            *ngIf="!incoming">
            <img src="{{message.author.avatarSrc}}">
        </div>
        <div class="messages"
            [ngClass]="{'message-sent': !incoming, 'msg-receive': incoming}">
            <p>{{message.text}}</p>
            <time>{{message.sender}} • {{message.sentAt | fromNow}}</time>
        </div>
        <div class="avatar"
            *ngIf="incoming">
            <img src="{{message.author.avatarSrc}}">
        </div>
    </div>
    `
})
export class ChatMessage implements OnInit {

    message: Message;

    currentUser: User;

    incoming: boolean;

    constructor(public userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.currentUser
            .subscribe((user: User) => {
                this.currentUser = user;
                if (this.message.author && user) {
                    this.incoming = this.message.author.id !== user.id;
                }
            });
    }

}
