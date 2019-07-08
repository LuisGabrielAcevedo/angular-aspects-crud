import { FormGroup } from '@angular/forms';
import { AspectsFormModel } from '../interfaces/aspects-form-model';

export class FormMethods {
    validationsControl = (group: FormGroup, key: string) =>
        !group.controls[key].valid && group.controls[key].touched

    setValue(group: FormGroup, key: string, model: AspectsFormModel) {
        setTimeout(() => {
            group.get(key).setValue(model[key]);
        }, 100);
    }
}
