import { Base } from './abstract-model/base';
import { Builder } from 'src/app/aspects/builder';
import { UserBuilder } from './user-builder';

export default class User extends Base {
    public resource = 'session/users';

    public builderClass(): typeof Builder {
        return UserBuilder;
    }
}
