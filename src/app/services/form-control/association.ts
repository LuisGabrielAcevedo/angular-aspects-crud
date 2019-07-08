import {Base} from './base';
import { SelectComponent } from '../aspects-form/select/select.component';

export class Association extends Base{
    renderFieldFor(form, options) {
    }

    renderSearchFieldFor(form, options) {
    }

    public getComponent() {
        return SelectComponent;
    }
}
