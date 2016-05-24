import { Injectable, bind } from "@angular/core";
import {User} from "../user.model.ts";
import {Subject, BehaviorSubject} from "rxjs";

@Injectable()
export class UserService {

    // a Subject is at the same time an Observable and an Observer
    currentUser: Subject<User> = new BehaviorSubject<User>(null);

    setCurrentUser(newUser: User): void {
        this.currentUser.next(newUser);
    }

}

export const userServiceInjectables: Array<any> = [
    bind(UserService).toClass(UserService)
];