import { Component, OnInit, Input } from '@angular/core';
import { AspectInferface } from '../../interfaces/aspect';
import { AspectsFormModel } from '../../interfaces/aspects-form-model';
import { FormGroup, ValidatorFn, FormBuilder } from '@angular/forms';
import { FormMethods } from '../aspects-form-methods.mixin';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.css']
})
export class SlideToggleComponent extends FormMethods implements OnInit {
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
    this.group.addControl(this.key, this.fb.control(this.aspect.defaultValue()));
    if (this.model && this.model[this.key]) {
    this.setValue(this.group, this.key, this.model);
    }
  }

}
