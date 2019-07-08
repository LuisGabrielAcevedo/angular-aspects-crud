import { Base } from './base';
import { EnumSelectComponent } from '../aspects-form/enum-select/enum-select.component';

export class Enum extends Base {
    public getFormComponent = (): typeof EnumSelectComponent => EnumSelectComponent;
}
