import { Builder } from '../aspects/builder';
import UnitsPreference from './units-preference';

export class UserBuilder extends Builder {
    public customizeAspects() {
        this.aspectOptions(['units_preference'], {
            association_class: UnitsPreference
        });
        this.aspectOptions(['name', 'email', 'password'], { tab: 'Basic info'});
        this.aspectOptions(['units_preference', 'locale'], { tab: 'Preferences'});
        this.aspectOptions(['avatar'], { group: 'right'});
    }

    public formColumns() {
        return 2;
    }
}
