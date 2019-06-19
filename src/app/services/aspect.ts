import { Base } from './form-control/base';

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
        //this.form_control = this.newFormControl(this.options.control_type || this.type, this.options)
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
        const klass = this.formControlTypes()[control_type] || 'FormControl::Generic';
        this.form_control = klass.new(this, options)
    }

    private formControlTypes() {
        return {
            integer: 'FormControl::Generic',
            float: 'FormControl::Number',
            decimal: 'FormControl::Number',
            datetime: 'FormControl::DateTimePicker',
            date: 'FormControl::DatePicker',
            time: 'FormControl::TimePicker',
            boolean: 'FormControl::Generic',
            unit: 'FormControl::Unit',
            enum: 'FormControl::Enum',
            has_one: 'FormControl::Association',
            belongs_to: 'FormControl::Association',
            has_many: 'FormControl::Association',
        };
    }
}
