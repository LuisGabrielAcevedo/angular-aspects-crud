import { Type } from '@angular/core';
import { TableAspectDataInterface } from '../aspect-table.interfaces';

export class AspectComponent {
    constructor(
        public component: Type<any>,
        public data: TableAspectDataInterface
    ) { }
}
