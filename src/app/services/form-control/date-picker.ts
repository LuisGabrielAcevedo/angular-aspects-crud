import { Base } from './base';
import { DatePickerComponent } from '../aspects-form/date-picker/date-picker.component';

export class DatePicker extends Base {
    renderFieldFor(form, options) {
    }

    renderSearchFieldFor(form, options) {
    }

    public getComponent() {
        return DatePickerComponent;
    }
}
