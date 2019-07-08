import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ComponentFactoryResolver,
    OnChanges,
    SimpleChanges,
    SimpleChange
} from '@angular/core';
import { FormDirective } from './select-field.directive';
import { IFormFieldData, EFormType } from '../material-form.interfaces';
import { FieldInstanceComponent } from './select-field-instance.component';
import { InputComponent } from '../input/input.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { DatePickerComponent } from '../datepicker/date-picker.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { SelectComponent } from '../select/select.component';
import { SliderComponent } from '../slider/slider.component';


@Component({
    selector: 'app-select-field',
    template: `<ng-template appFormSelectFieldDirective></ng-template>`
})
export class SelectFieldComponent implements OnInit, OnChanges {
    @ViewChild(FormDirective) addFormDirective: FormDirective;
    @Input() data: IFormFieldData;
    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const cData: SimpleChange = changes.data;
        if (cData) { this.data = { ...cData.currentValue }; }
        this.loadComponent();
    }

    loadComponent() {
        switch (this.data.field.type) {
            case EFormType.input: {
                const formItem = new FieldInstanceComponent(InputComponent, this.data);
                const componentInstance = this.generateInstance<InputComponent>(formItem);
                if (formItem.data) {
                    componentInstance.field = this.data.field;
                    componentInstance.group = this.data.group;
                }
                break;
            }
            case EFormType.autocomplete: {
                const formItem = new FieldInstanceComponent(AutocompleteComponent, this.data);
                const componentInstance = this.generateInstance<AutocompleteComponent>(formItem);
                if (formItem.data) {
                    componentInstance.field = this.data.field;
                    componentInstance.group = this.data.group;
                }
                break;
            }
            case EFormType.checkbox: {
                const formItem = new FieldInstanceComponent(CheckboxComponent, this.data);
                const componentInstance = this.generateInstance<CheckboxComponent>(formItem);
                if (formItem.data) {
                    componentInstance.field = this.data.field;
                    componentInstance.group = this.data.group;
                }
                break;
            }
            case EFormType.datepicker: {
                const formItem = new FieldInstanceComponent(DatePickerComponent, this.data);
                const componentInstance = this.generateInstance<DatePickerComponent>(formItem);
                if (formItem.data) {
                    componentInstance.field = this.data.field;
                    componentInstance.group = this.data.group;
                }
                break;
            }
            case EFormType.radioButton: {
                const formItem = new FieldInstanceComponent(RadioButtonComponent, this.data);
                const componentInstance = this.generateInstance<RadioButtonComponent>(formItem);
                if (formItem.data) {
                    componentInstance.field = this.data.field;
                    componentInstance.group = this.data.group;
                }
                break;
            }
            case EFormType.select: {
                const formItem = new FieldInstanceComponent(SelectComponent, this.data);
                const componentInstance = this.generateInstance<SelectComponent>(formItem);
                if (formItem.data) {
                    componentInstance.field = this.data.field;
                    componentInstance.group = this.data.group;
                }
                break;
            }
            case EFormType.slider: {
                const formItem = new FieldInstanceComponent(SliderComponent, this.data);
                const componentInstance = this.generateInstance<SliderComponent>(formItem);
                if (formItem.data) {
                    componentInstance.field = this.data.field;
                    componentInstance.group = this.data.group;
                }
                break;
            }
        }
    }

    private generateInstance<T>(FieldInstanceComponent: FieldInstanceComponent) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FieldInstanceComponent.component);
        const viewContainerRef = this.addFormDirective.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        const componentInstance = <T>componentRef.instance;
        return componentInstance;
    }
}
