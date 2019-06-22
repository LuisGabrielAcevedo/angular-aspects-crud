import { Component, OnInit, Input } from '@angular/core';
import { Aspect } from '../../aspect';
import { FormGroup, FormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() public aspect: Aspect;
  @Input() public model: any;
  @Input() public group: FormGroup;
  validations: ValidatorFn[] = [];
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.aspect.isRequired()) this.validations.push(Validators.required);
    this.group.addControl(this.aspect.accessor, this.fb.control(this.model[this.aspect.accessor], this.validations));
  }

  validationsControl(){
    return !this.group.controls[this.aspect.accessor].valid;
  }
}