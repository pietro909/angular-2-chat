import {Injectable, bind} from "@angular/core";
import {Subject, BehaviorSubject, Observable} from "rxjs";
import {Thread, Message} from "../models";
import {MessagesService} from "message.service.ts";
import * as _ from "underscore";

@Injectable()
export class ThreadsService {

    threads: Observable<{ [key: string] : Thread }>;

    orderedThreads: Observable<Thread[]>;

    currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());

    currentThreadMessages: Observable<Message[]>;

    constructor(
        private messagesService: MessagesService
    ) {
        this.threads = this.messagesService.messages
            .map((messages: Message[]) => {
                let threads: Thread[] = [];
                messages.map((message: Message) =>{
                    threads[message.thread.id] = threads[message.thread.id] || message.thread;

                    let messagesThread: Thread = threads[message.thread.id];
                    if (!messagesThread.lastMessage || messagesThread.lastMessage.sentAt < message.sentAt) {
                        messagesThread.lastMessage = message;
                    }
                });
                return threads;
            });

        this.orderedThreads = this.threads
            .map((threadGroups: {[key: string]: Thread}) => {
                let threads: Thread[] = _.values(threadGroups);
                return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
            });

        this.currentThreadMessages = this.currentThread
            .combineLatest(
                this.messagesService.messages,
                (currentThread: Thread, messages: Message[]) => {
                    if (currentThread && messages.length > 0) {
                        return _.chain(messages)
                            .filter((message: Message) => message.thread.id == currentThread.id)
                            .map((message: Message) => {
                                // todo: side effects here
                                message.isRead = true;
                                return message;
                            })
                            .value();
                    } else {
                        return [];
                    }
                }
            );

    }

    setCurrentThread(thread: Thread): void {
        this.currentThread.next(thread);
    }
}

export const threadsServiceInjectables: Array<any> = [
    bind(ThreadsService).toClass(ThreadsService)
];
