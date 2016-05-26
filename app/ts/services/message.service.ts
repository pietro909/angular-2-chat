import { Injectable, bind } from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {Message} from '../message.model.ts';
import {User} from '../user.model.ts';
import {Thread} from '../thread.model.ts';

let initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
    (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {

    newMessages: Subject<Message> = new Subject<Message>();

    messages: Observable<Message[]>;

    updates: Subject<any> = new Subject<any>();

    create: Subject<Message> = new Subject<Message>();

    markThreadAsRead: Subject<any> = new Subject<any>();

    constructor() {

        this.messages = this.updates
            .scan((messages: Message[],
                   operation: IMessagesOperation) => {
                        return operation(messages);
                    }, initialMessages)
            // this is to make sure that new subscribers will get the last message
            .publishReplay(1)
            .refCount();

        this.create
           .map((message: Message): IMessagesOperation =>
               (messages: Message[]) => messages.concat(message)
           )
           .subscribe(this.updates);

        this.newMessages
            .subscribe(this.create);

        this.markThreadAsRead
            .map((thread: Thread) => {
                console.log('wtf');
                return (messages:Message[]) =>
                    (message:Message) => {
                        // todo: mutability here!
                        if (message.thread.id === thread.id) {
                            message.isRead = true;
                        }
                        return message;
                    }
            });
    }

    addMessage(message: Message): void {
        this.newMessages.next(message);
    }

    messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
        return this.newMessages
            .filter((message: Message) => {
                return message.thread.id === thread.id &&
                        message.author.id !== user.id;
            });
    }

}

export const messagesServiceInjectables: Array<any> = [
    bind(MessagesService).toClass(MessagesService)
];
