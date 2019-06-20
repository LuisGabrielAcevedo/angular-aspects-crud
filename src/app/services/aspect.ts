import { Base } from './form-control/base';
import {Generic} from './form-control/generic';
import {Number} from './form-control/number';
import {DateTimePicker} from './form-control/date-time-picker';
import {DatePicker} from './form-control/date-picker';
import {TimePicker} from './form-control/time-picker';
import {Unit} from './form-control/unit';
import {Enum} from './form-control/enum';
import {Association} from './form-control/association';

export class Aspect {
    name: string;
    accessor: string;
    type: string;
    default_value: string;
    nullable: boolean;
    options: {
        [key: string]: any;
    };
    form_control: Base;
    constructor(name: string, accessor: string, type: string, default_value: string, nullable: boolean, options?: { [key: string]: any; }) {
        this.name = name;
        this.accessor = accessor;
        this.type = type;
        this.default_value = default_value;
        this.nullable = nullable;
        this.options = options ? options : [];
        this.applyOptions();
    }

    label = () => this.options.label || this.name;

    isRequired = () => this.options.required;

    isVisible = () => this.options.visible;

    isEditable = () => this.options.editable;

    isImportable = () => this.options.importable;

    private applyOptions() {
        this.form_control = this.newFormControl((this.options.control_type || this.type), this.options);
    }

    public setOptions(args) {
        this.options.merge(args);
        this.applyOptions();
    }

    public fieldFor(form, view_options) {
        this.form_control.fieldFor(form, view_options);
    }

    public searchFieldFor(form, view_options) {
        this.form_control.searchFieldFor(form, view_options);
    }

    private newFormControl(control_type, options) {
        const klass = this.formControlTypes()[control_type] || Generic;
        return this.form_control = new klass(this, options);
    }

    private formControlTypes() {
        return {
            integer: Generic,
            float: Number,
            decimal: Number,
            datetime: DateTimePicker,
            date: DatePicker,
            time: TimePicker,
            boolean: Generic,
            unit: Unit,
            enum: Enum,
            has_one: Association,
            belongs_to: Association,
            has_many: Association,
        };
    }
}
