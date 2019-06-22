import { Base } from './form-control/base';
import { Generic } from './form-control/generic';
import { Number } from './form-control/number';
import { DateTimePicker } from './form-control/date-time-picker';
import { DatePicker } from './form-control/date-picker';
import { TimePicker } from './form-control/time-picker';
import { Unit } from './form-control/unit';
import { Enum } from './form-control/enum';
import { Association } from './form-control/association';
import { IntegerToText } from './converters/integert-to-text';
import { FloatToText } from './converters/float-to-text';
import { DateTimeToText } from './converters/date-time-to-text';
import { BooleanToText } from './converters/boolean-to-text';
import { ObjectToText } from './converters/object-to-text';

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
    converter: ObjectToText;
    constructor(name: string, accessor: string, type: string, default_value: string, nullable: boolean, options?: { [key: string]: any; }) {
        this.name = name;
        this.accessor = accessor;
        this.type = type;
        this.default_value = default_value;
        this.nullable = nullable;
        this.options = options ? options : [];
        this.applyOptions();
    }

    public label = () => this.options.label || this.name;

    public isRequired = () => this.options.required;

    public isVisible = () => this.options.visible;

    public isEditable = () => this.options.visible && this.options.editable;

    public isIndexAspect = () => this.options.visible && this.options.index;

    public isImportable = () => this.options.importable;

    public fieldFor = (form, view_options) => this.form_control.fieldFor(form, view_options);

    public getComponent = () => this.form_control.getComponent();

    public searchFieldFor = (form, view_options) => this.form_control.searchFieldFor(form, view_options);

    public setOptions(args) {
        this.options.concat(args);
        this.applyOptions();
    }

    public displayFor(object, options = {}) {
        return this.converter.displayFor(this.valueFor(object), options);
    }

    public valueFor(object) {
        return object[this.accessor];
    }

    private applyOptions() {
        this.form_control = this.newFormControl((this.options.control_type || this.type), this.options);
        this.converter = this.newConverter((this.options.control_type || this.type), this.options);
    }

    private newFormControl(control_type, options) {
        const klass = this.formControlTypes()[control_type] || Generic;
        return this.form_control = new klass(this, options);
    }

    private newConverter(converter_type, options) {
        const klass = this.converterTypes()[converter_type] || ObjectToText;
        return this.converter = new klass(options);
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

    private converterTypes() {
        return {
            integer: IntegerToText,
            float: FloatToText,
            decimal: FloatToText,
            datetime: DateTimeToText,
            date: DateTimeToText,
            time: DateTimeToText,
            boolean: BooleanToText,
            unit: ObjectToText,
            enum: ObjectToText,
            has_one: ObjectToText,
            belongs_to: ObjectToText,
            has_many: ObjectToText,
        };
    }
}
