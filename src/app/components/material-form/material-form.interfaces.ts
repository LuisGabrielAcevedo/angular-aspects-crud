import { FormGroup } from '@angular/forms';

export interface IFormField {
    value: any;
    label: string;
    key: string;
    type: EFormType;
    placeholder?: string;
    inputType?: string;
}

export enum EFormType {
    input = 'InputComponent',
    autocomplete = 'AutocompleteComponent',
    select = 'SelectComponent',
    checkbox = 'CheckboxComponent',
    datepicker = 'DatepickerComponent',
    radioButton = 'RadioButtonComponent',
    slider = 'SliderComponent'
}

export interface IFormFieldData {
    field: IFormField;
    group: FormGroup;
}