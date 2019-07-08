import { Base } from './base';
import { DatePickerComponent } from '../aspects-form/date-picker/date-picker.component';

export class DatePicker extends Base {
    public getFormComponent = (): typeof DatePickerComponent => DatePickerComponent;
}
