import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { AspectInferface } from '../../interfaces/aspect';
import { AspectsFormModel } from '../../interfaces/aspects-form-model';
import { FormMethods } from '../aspects-form-methods.mixin';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent extends FormMethods implements OnInit {
  constructor(
    private fb: FormBuilder
  ) { super(); }
  @Input() public aspect: AspectInferface;
  @Input() public model: AspectsFormModel;
  @Input() public group: FormGroup;
  @Input() public appearance: string;
  validations: ValidatorFn[] = [];
  public key: string;
  data: any[] = [];
  public compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  ngOnInit() {
    this.key = this.aspect.options.foreign_key || this.aspect.accessor;
    this.validations = this.isRequiredValidation(this.aspect, this.validations);
    this.group.addControl(this.key, this.fb.control(this.aspect.defaultValue(), this.validations));
    if (this.model && this.model[this.aspect.accessor]) {
      this.group.get(this.key).setValue(this.model[this.aspect.accessor]['id']);
    }
    this.loadOptions();
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1 === f2;
  }

  async loadOptions() {
    const resp = await this.aspect.selectOptions();
    this.data = resp;
  }

  formDisplay(item: { key: number, value: object }) {
    return this.aspect.converter.displayFor(item.value);
  }
}
