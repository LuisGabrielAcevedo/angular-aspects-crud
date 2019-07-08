import { Base } from './base';
import { CheckboxComponent } from '../aspects-form/checkbox/checkbox.component';
import { AspectOptions } from '../interfaces/aspect-elements';

export class Boolean extends Base {
    public getFormComponent = (options?: AspectOptions): any => {
        if (options && options.form_component) {
            return this.components()[options.form_component];
        }
        return CheckboxComponent;
    }
}
