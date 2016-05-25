import {Component} from '@angular/core';
import {ThreadsService} from './services/threads.service';
import {MessagesService} from './services/message.service';
import {Message} from './message.model';
import {Thread} from './thread.model';
import * as _ from 'underscore';

@Component({
    selector: 'nav-bar',
    template: `
    <nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="https://ng-book.com/2">
                <img 
                    src="${require('images/logos/ng-book-2-minibook.png')}"/>
                ng-book 2
            </a>
        </div>
        <p class="navbar-text navbar-right">
            <button class="btn-primary" type="button">
                Messages <span class="badge">{{unreadMessagesCount}}</span>
            </button>
        </p>
    </div>
    </nav>
    `
})
export class ChatNavBar {

    unreadMessagesCount: number;

    constructor(public messagesService: MessagesService,
                public threadsService: ThreadsService) {
    }

    ngOnInit(): void {
        this.messagesService.messages
            .combineLatest(
                this.threadsService.currentThread,
                (messages: Message[], currentThread: Thread) =>
                    [currentThread, messages]
            )
            .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
                this.unreadMessagesCount = _.reduce(
                    messages,
                    (sum: number, m: Message) => {
                        let isInThread: boolean = m.thread && currentThread &&
                            (currentThread.id === m.thread.id);
                        if (m && !m.isRead && !isInThread) {
                            sum += 1;
                        }
                        return sum;
                    },
                    0);
            });
    }
}
