import * as _ from "underscore";
import {User} from "../app/ts/user.model";
import {Thread} from "../app/ts/thread.model";
import {Message} from "../app/ts/message.model";
import {MessagesService} from "../app/ts/message.service";
import {ThreadsService} from "../app/ts/threads.service";

describe("Thread service", () => {
    it('should collect the Threads from Messages', () => {
        const nate: User = new User('Nate', "");
        const felipe: User = new User('Felipe', "");

        const t1: Thread = new Thread('t1', 'Threa 1', '');
        const t2: Thread = new Thread('t2', 'Threa 2', '');

        let m1: Message = new Message({
            author: nate,
            text: 'Hi!',
            thread: t1
        });

        let m2: Message = new Message({
            author: felipe,
            text: 'Where did you get that hat?',
            thread: t1
        });

        let m3: Message = new Message({
            author: nate,
            text: 'Did you bring the briefcase?',
            thread: t2
        });

        let messagesService: MessagesService = new MessagesService();
        let threadsService: ThreadsService = new ThreadsService(messagesService);

        threadsService.threads
            .subscribe((threadIdx: { [key: string]: Thread }) => {
                const threads = _.values(threadIdx);
                const threadNames = _.map(threads, (t: Thread) => t.name);
                console.log(` => threads (${threads.length}: ${threadNames}`);
            });

        messagesService.addMessage(m1);
        messagesService.addMessage(m2);
        messagesService.addMessage(m3);
    })
})
