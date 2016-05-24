import { uuid } from './util/uuid';

export class User {

    id: string;
    name: string;
    avatarSrc: string;

    constructor(
        name: string,
        avatarSrc: string
    ) {
        this.name = name;
        this.avatarSrc = avatarSrc;
        this.id = uuid();
    }
}
