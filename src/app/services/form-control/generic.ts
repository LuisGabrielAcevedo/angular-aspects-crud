import { Base } from './base';
import { GenericComponent } from '../aspects-form/generic/generic.component';

export class Generic extends Base {
    renderFieldFor(form, options) {
    }

    renderSearchFieldFor(form, options) {
    }

    public getComponent() {
        return GenericComponent;
    }
}
