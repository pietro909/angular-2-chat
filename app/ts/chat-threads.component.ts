import {Component, ChangeDetectionStrategy} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ThreadsService} from "./services/threads.service";
import {ChatThread} from "./chat-thread.component";

@Component({
    selector: 'chat-threads',
    directives: [ChatThread],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <!-- conversations -->
        <div class="row">
            <div class="conversation-wrap">
                <chat-thread
                    *ngFor="let thread of threads | async"
                    [thread]="thread">
                </chat-thread>
            </div>
        </div>
    `
})
export class ChatThreads {

    threads: Observable<any>;

    constructor(public threadsService: ThreadsService) {
        this.threads = threadsService.orderedThreads;
    }
}
