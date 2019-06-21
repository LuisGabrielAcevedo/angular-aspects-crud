import { Type } from '@angular/core';
import { FormAspectDataInterface } from '../aspects-form.interfaces';

export class AspectComponent {
    constructor(
        public component: Type<any>, 
        public data: FormAspectDataInterface
    ) { }
}