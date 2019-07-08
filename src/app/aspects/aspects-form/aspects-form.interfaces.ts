import { FormGroup } from '@angular/forms';
import { AspectsFormModel } from '../interfaces/aspects-form-model';
import { AspectInferface } from '../interfaces/aspect';

export interface FormAspectDataInterface {
    aspect: AspectInferface;
    model: AspectsFormModel;
    group: FormGroup;
    appearance: string;
}

export interface ColumnsFormatted {
    fxLayout: number;
    aspects: AspectInferface[];
}

export interface AspectsGroup {
    tab: string;
    aspects: AspectInferface[] | ColumnsFormatted[];
}
