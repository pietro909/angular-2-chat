import { uuid } from './util/uuid';
import {Message} from "./message.model";

export class Thread {

    id: string;
    name: string;
    avatarSrc: string;
    lastMessage: Message;

    constructor(
        id: string,
        name: string,
        avatarSrc: string
    ) {
        this.id = id || uuid();
        this.name = name;
        this.avatarSrc = avatarSrc;
    }
    
}