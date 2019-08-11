import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AspectsFormModel } from '../interfaces/aspects-form-model';
import { AspectInferface } from '../interfaces/aspect';

export class FormMethods {
    isRequiredValidation = (aspect: AspectInferface, validations: ValidatorFn[]) => {
        if (aspect.options.required) { validations.push(Validators.required); }
        return validations;
    }

    validationsControl = (group: FormGroup, key: string) =>
        !group.controls[key].valid && group.controls[key].touched

    setValue(group: FormGroup, key: string, model: AspectsFormModel) {
        setTimeout(() => {
            group.get(key).setValue(model[key]);
        }, 10);
    }
}
