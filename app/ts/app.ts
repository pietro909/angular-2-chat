import {Component} from "@angular/core";
import {UserService } from "./services/user.service.ts";
import {MessagesService} from "./services/message.service.ts";
import {ThreadsService} from "./services/threads.service.ts";

import {ChatExampleData} from "./mocks/chat-data.mock";
import {ChatThreads} from "./chat-threads.component";
import {ChatWindow} from "./chat-window.component";
import {ChatNavBar} from "./chat-nav-bar.component";


@Component({
    selector: 'chat-app',
    directives: [ChatNavBar, ChatThreads, ChatWindow],
    template: `
        <nav-bar></nav-bar>
        <div class="container">
            <chat-threads></chat-threads>
            <chat-window></chat-window>
        </div>
    `
})
export class ChatApp {

    constructor(public messagesService: MessagesService,
                public threadsService: ThreadsService,
                public userService: UserService) {
        ChatExampleData.init(messagesService, threadsService, userService);
    }
}