import { Type } from '@angular/core';
import { IFormFieldData } from '../bootstrap-form.interfaces';

export class FieldInstanceComponent {
    constructor(
        public component: Type<any>, 
        public data: IFormFieldData
    ) { }
}