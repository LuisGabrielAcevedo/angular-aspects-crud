import { Builder } from '../aspects/builder';
import Country from './country';

export class StateBuilder extends Builder {
    public customizeAspects() {
        this.aspectOptions(['country'], {
            association_class: Country,
            association_key: 'name'
        });
    }
}
