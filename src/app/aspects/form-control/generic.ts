import { Base } from './base';
import { GenericComponent } from '../aspects-form/generic/generic.component';

export class Generic extends Base {
    public getFormComponent = (): typeof GenericComponent => GenericComponent;
}
