/**
 * From the original work of ng-book 2 authors
 *
 * Copyright 2016, Fullstack.io, LLC.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import {Component} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';

import {MessagesService} from './services/message.service.ts';
import {ThreadsService} from './services/threads.service.ts';

import {ChatExampleData} from './mocks/chat-data.mock';
import {ChatThreads} from './chat-threads.component';
import {ChatWindow} from './chat-window.component';
import {ChatNavBar} from './chat-nav-bar.component';

import {utilInjectables} from "./util/util";
import {UserService } from './services/user.service.ts';
import {userServiceInjectables} from './services/user.service';
import {messagesServiceInjectables} from './services/message.service';
import {threadsServiceInjectables} from './services/threads.service';

/*
 * Webpack goes here
 */
require('../css/styles.scss');

@Component({
    selector: 'chat-app',
    directives: [ChatNavBar, ChatThreads, ChatWindow],
    template: `
	<div>
        <nav-bar></nav-bar>
        <div class="container">
            <chat-threads></chat-threads>
            <chat-window></chat-window>
        </div>
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

const servicesInjectables = [
    userServiceInjectables,
    messagesServiceInjectables,
    threadsServiceInjectables
];

bootstrap(ChatApp, [servicesInjectables, utilInjectables]);

// --------------------
// You can ignore these 'require' statements. The code will work without them.
// They're currently required to get watch-reloading
// from webpack, but removing them is a TODO
/*
require('./services/services');
require('./ChatExampleData');
require('./util/util');
require('./components/ChatNavBar');
require('./components/ChatWindow');
require('./components/ChatThreads');
*/
