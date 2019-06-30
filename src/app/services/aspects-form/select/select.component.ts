import { Component, OnInit, Input } from '@angular/core';
import { Aspect } from 'src/app/services/aspect';
import { FormGroup, ValidatorFn, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  @Input() public aspect: Aspect;
  @Input() public model: any;
  @Input() public group: FormGroup;
  validations: ValidatorFn[] = [];
  compareByValue = (f1: any, f2: any) => f1 && f2 && f1 === f2;
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  data: any[] = [];
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.aspect.isRequired()) this.validations.push(Validators.required);
    this.group.addControl(this.aspect.accessor, this.fb.control(this.model[this.aspect.accessor]));
    const options = this.aspect.selectOptions();
    options.all().then(resp => {
      this.data = resp;
    })
  }

  validationsControl(){
    return !this.group.controls[this.aspect.accessor].valid;
  }
}
