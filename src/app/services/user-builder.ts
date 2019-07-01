import {Builder} from './builder';

export class UserBuilder extends Builder {

    public customizeAspects() {
        super.customizeAspects();
        this.aspectOptions(['created_at', 'updated_at'], {format: 'short'});
        this.aspectOptions(['country'], { association_class: 'country'});
    }
}
