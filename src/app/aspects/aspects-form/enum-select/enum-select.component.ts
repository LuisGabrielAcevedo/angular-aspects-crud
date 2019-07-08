import { Component, OnInit, Input } from '@angular/core';
import { AspectInferface } from '../../interfaces/aspect';
import { AspectsFormModel } from '../../interfaces/aspects-form-model';
import { FormGroup, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { FormMethods } from '../aspects-form-methods.mixin';

@Component({
  selector: 'app-enum-select',
  templateUrl: './enum-select.component.html',
  styleUrls: ['./enum-select.component.css']
})
export class EnumSelectComponent extends FormMethods implements OnInit {
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

  ngOnInit() {
    this.key = this.aspect.options.foreign_key || this.aspect.accessor;
    if (this.aspect.options.required) { this.validations.push(Validators.required); }
    this.group.addControl(this.key, this.fb.control(this.aspect.defaultValue(), this.validations));
    if (this.model && this.model[this.key]) {
    this.setValue(this.group, this.key, this.model);
    }
    this.loadOptions();
  }

  async loadOptions() {
    this.data = await this.aspect.selectOptions();
  }
}
