import { FormGroup } from '@angular/forms';
import { Aspect } from '../aspect';

export interface FormAspectDataInterface {
    aspect: Aspect;
    model: any;
    group: FormGroup;
}