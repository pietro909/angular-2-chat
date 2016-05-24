import { bootstrap }    from '@angular/platform-browser-dynamic';

import {utilInjectables} from "./util/util";
import {userServiceInjectables} from "./services/user.service";
import {messagesServiceInjectables} from "./services/message.service";
import {threadsServiceInjectables} from "./services/threads.service";

import {ChatApp as AppComponent} from './app';

const servicesInjectables = [
    userServiceInjectables,
    messagesServiceInjectables,
    threadsServiceInjectables
];

bootstrap(AppComponent, [servicesInjectables, utilInjectables]);
