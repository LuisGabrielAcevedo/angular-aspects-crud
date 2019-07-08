import { Base } from './abstract-model/base';
import { Builder } from 'src/app/aspects/builder';
import { StateBuilder } from './state-builder';

export default class State extends Base {
    public resource = 'corporate/states';

    public builderClass(): typeof Builder {
        return StateBuilder;
    }
}
