import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { AspectInferface } from '../../interfaces/aspect';
import { AspectsFormModel } from '../../interfaces/aspects-form-model';
import { FormMethods } from '../aspects-form-methods.mixin';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent extends FormMethods implements OnInit {
  @Input() public aspect: AspectInferface;
  @Input() public model: AspectsFormModel;
  @Input() public group: FormGroup;
  @Input() public appearance: string;
  public key: string;
  validations: ValidatorFn[] = [];
  constructor(
    private fb: FormBuilder
  ) { super(); }

  ngOnInit() {
    this.key = this.aspect.accessor;
    if (this.aspect.options.required) { this.validations.push(Validators.required); }
    this.group.addControl(this.key, this.fb.control(this.aspect.defaultValue(), this.validations));
    if (this.model && this.model[this.key]) {
    this.setValue(this.group, this.key, this.model);
    }
  }
}
