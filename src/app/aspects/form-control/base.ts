import { Aspect } from '../aspect';
import { AutocompleteComponent } from '../aspects-form/autocomplete/autocomplete.component';
import { CheckboxComponent } from '../aspects-form/checkbox/checkbox.component';
import { DatePickerComponent } from '../aspects-form/date-picker/date-picker.component';
import { GenericComponent } from '../aspects-form/generic/generic.component';
import { NumberComponent } from '../aspects-form/number/number.component';
import { RadioButtomsComponent } from '../aspects-form/radio-buttoms/radio-buttoms.component';
import { SelectComponent } from '../aspects-form/select/select.component';
import { SlideToggleComponent } from '../aspects-form/slide-toggle/slide-toggle.component';
import { TreeComponent } from '../aspects-form/tree/tree.component';
import { AspectOptions } from '../interfaces/aspect-elements';

export abstract class Base {

    protected constructor(aspect, options) {
        this.aspect = aspect;
        this.options = options;
    }
    aspect: Aspect;
    options = [];
    abstract getFormComponent(options?: AspectOptions);

    public renderHiddenFieldFor(form, options) { }

    fieldFor(form: any, options: any): void {
        this.mergeOptions(options);
        if (this.options.includes('hidden')) {
            this.renderHiddenFieldFor(form, options);
        }
    }

    searchFieldFor(form: any, options: any) {
        this.mergeOptions(options);
    }

    private mergeOptions(options: any) {
        this.options.concat(options);
        this.options.concat({ 'placeholder': this.aspect.label });
    }

    public components() {
        return {
            autocomplete: AutocompleteComponent,
            checkbox: CheckboxComponent,
            datePicker: DatePickerComponent,
            generic: GenericComponent,
            number: NumberComponent,
            radioButtons: RadioButtomsComponent,
            select: SelectComponent,
            slideToggle: SlideToggleComponent,
            tree: TreeComponent
        };
    }
}


