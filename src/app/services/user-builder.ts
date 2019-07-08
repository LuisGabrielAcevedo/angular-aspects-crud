import {Builder} from './builder';

export class UserBuilder extends Builder {

    public customizeAspects() {
        super.customizeAspects();
        this.aspectOptions(['country'], { association_class: 'country'});
    }
}
