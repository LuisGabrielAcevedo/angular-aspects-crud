import { Base } from './base';
import { SelectComponent } from '../aspects-form/select/select.component';
import { AspectOptions } from '../interfaces/aspect-elements';

export class Association extends Base {
    public getFormComponent = (options?: AspectOptions): any => {
        if (options && options.form_component) {
            return this.components()[options.form_component];
        }
        return SelectComponent;
    }
}
