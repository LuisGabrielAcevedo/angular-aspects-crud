import { Base } from './form-control/base';
import { Generic } from './form-control/generic';
import { Number } from './form-control/number';
import { Boolean } from './form-control/boolean';
import { DateTimePicker } from './form-control/date-time-picker';
import { DatePicker } from './form-control/date-picker';
import { TimePicker } from './form-control/time-picker';
import { Unit } from './form-control/unit';
import { Enum } from './form-control/enum';
import { Association } from './form-control/association';
import { IntegerToText } from './converters/integer-to-text';
import { FloatToText } from './converters/float-to-text';
import { DateTimeToText } from './converters/date-time-to-text';
import { BooleanToText } from './converters/boolean-to-text';
import { ObjectToText } from './converters/object-to-text';
import { AspectInferface } from './interfaces/aspect';
import { AspectOptions } from './interfaces/aspect-elements';
import { AssociationToText } from './converters/association-to-text';
import { File } from './form-control/file';
declare var require: any;

export class Aspect implements AspectInferface {
    name: string;
    accessor: string;
    type: string;
    default_value: string;
    nullable: boolean;
    options: AspectOptions;
    form_control: Base;
    converter: ObjectToText;
    constructor(name: string, accessor: string, type: string, default_value: string, nullable: boolean, options?: AspectOptions) {
        this.name = name;
        this.accessor = accessor;
        this.type = type;
        this.default_value = default_value;
        this.nullable = nullable;
        this.options = options ? options : {};
        this.applyOptions();
    }

    public label = (): string => this.options.label || this.name;

    public isRequired = (): boolean => this.options.required;

    public isVisible = (): boolean => this.options.visible;

    public isEditable = (): boolean => this.options.visible && this.options.editable;

    public isIndexAspect = (): boolean => this.options.visible && this.options.index;

    public isImportable = (): boolean => this.options.importable;

    public fieldFor = (form: any, view_options: any): void => this.form_control.fieldFor(form, view_options);

    public searchFieldFor = (form, view_options): void => this.form_control.searchFieldFor(form, view_options);

    public getFormComponent = (): any => this.form_control.getFormComponent(this.options);

    public defaultValue = (): any =>
        this.values()[this.type] ? this.values()[this.type] : null

    public strongParam() {
        return this.options.foreign_key || this.name;
    }

    public setOptions(args: object): void {
        this.options = Object.assign(this.options, args);
        this.applyOptions();
    }

    public displayFor(object, options = {}) {
        return this.converter.displayFor(this.valueFor(object), options);
    }

    public valueFor(object): any {
        return object[this.accessor];
    }

    public async selectOptions(): Promise<any> {
        let options: Array<{key: string, value: any}> = []
        if (this.isAssociation()) {
            const resp = await this.options.association_class.all();
            resp.data.forEach(option => {
                options.push({
                    key: option['id'] || option['_id'],
                    value: option
                });
            })
        }
        if (this.isEnum() && this.options.in) {
            this.options.in.forEach(option => {
                options.push({
                    key: option,
                    value: option
                });
            })
        }
        return options;
    }

    private isEnum(): boolean {
        return this.type === 'enum';
    }

    private isAssociation(): boolean {
        const types: string[] = ['belongs_to'];
        return types.includes(this.type);
    }

    private newFormControl(control_type, options): any {
        const klass = this.formControlTypes()[control_type] || Generic;
        return this.form_control = new klass(this, options);
    }

    private applyOptions(): void {
        this.form_control = this.newFormControl((this.options.control_type || this.type), this.options);
        this.converter = this.newConverter((this.options.control_type || this.type), this.options);
    }

    private values(): any {
        return {
            string: '',
            belongs_to: null,
            date: ''
        };
    }

    private newConverter(converter_type, options): any {
        const klass = this.converterTypes()[converter_type] || ObjectToText;
        return this.converter = new klass(options);
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
            belongs_to: AssociationToText,
            has_many: ObjectToText,
            file: ObjectToText
        };
    }

    private formControlTypes() {
        return {
            integer: Generic,
            float: Number,
            decimal: Number,
            datetime: DateTimePicker,
            date: DatePicker,
            time: TimePicker,
            boolean: Boolean,
            unit: Unit,
            enum: Association,
            has_one: Association,
            belongs_to: Association,
            has_many: Association,
            file: File
        };
    }
}
