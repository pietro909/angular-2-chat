import {Message, User, Thread} from '../app/ts/models';
import {MessagesService} from "../app/ts/message.service";

describe('MessagesService', () => {
    it('should test', () => {
        const user: User = new User('Nate', '');
        const thread: Thread = new Thread('tl', 'Nate');
        const ml: Message = new Message({
            author: user,
            text: 'Hi',
            thread: thread
        });
        const m2: Message = new Message({
            author: user,
            text: 'how are you?',
            thread: thread
        });

        const messagesService: MessagesService = new MessagesService();

        messagesService.newMessages
            .subscribe((message: Message) => {
                console.log(` => message: ${message.text}`);
            });
        
        messagesService.messages
            .subscribe((messages: Message[]) => {
                console.log(` => messages ${messages.length}`);
            });

        messagesService.addMessage(ml);
        messagesService.addMessage(m2);

    });

});