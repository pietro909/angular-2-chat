import {Component, ChangeDetectionStrategy, OnInit, ElementRef} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Message} from "./message.model";
import {Thread} from "./thread.model";
import {MessagesService} from "./services/message.service";
import {User} from "./user.model";
import {UserService} from "./services/user.service";
import {ThreadsService} from "./services/threads.service";

@Component({
    selector: "chat-window",
    directives: [ChatMessage, FORM_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="chat-window-container">
            <div class="chat-window">
                <div class="pane-container">
                    <div class="panel panel-default">
                        <div class="panel-heading top-bar">
                            <div class="panel-title-container">
                                <h3 class="panel-title">
                                    <span class="glyphicon glyphicon-comment"></span>
                                    Chat - {{currentThread.name}}
                                </h3>
                            </div>
                            <div class="panel-buttons-container">
                                <!-- you could put minimize or close buttons here -->
                            </div>
                        </div>
                        <div class="panel-body msg-container-base">
                            <chat-message
                                *ngFor="let message of messages | async"
                                [message]="message">
                            </chat-message>
                        </div>
                        <div class="panel-footer">
                            <div class="input-group">
                                <input type="text"
                                    class="chat-input"
                                    placeholder="Write your message here"
                                    (keydown.enter)="onEnter($event)"
                                    [(ngModel)]="draftmessage.text" />
                                <span class="input-group-btn"
                                    (click)="onEnter($event)">
                                    Send
                                </span>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    `
})

export class ChatWindow implements OnInit {

    messages: Observable<any>;

    currentThread: Thread;

    draftMessage: Message;

    currentUser: User;

    constructor(public messagesService: MessagesService,
                public threadsService: ThreadsService,
                public userService: UserService,
                public el: ElementRef) {
    }

    ngOnInit(): void {
        this.messages =this.threadsService.currentThreadMessages;
        this.draftMessage = new Message();
        
        this.userService.currentUser
            .subscribe((user: User) => this.currentUser = user);
        
        this.threadsService.currentThread.subscribe((thread: Thread) => this.currentThread = thread);
        
        this.messages
            .subscribe((messages: Message[]) => setTimeout(() => this.scrollToBottom()));
    }

    sendMessage(): void {
        let m: Message = this.draftMessage;
        m.author = this.currentUser;
        m.thread = this.currentThread;
        m.isRead = true;
        this.messagesService.addMessage(m);
        this.draftMessage = new Message();
    }

    onEnter(event: any): void {
        this.sendMessage();
        event.preventDefault();
    }

    scrollToBottom(): void {
        const scrollPane: any = this.el
            .nativeElement.querySelector('.msg-container-base');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }
}