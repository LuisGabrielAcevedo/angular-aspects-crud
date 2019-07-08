import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFormField } from './material-form.interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css']
})
export class MaterialFormComponent implements OnInit {
  @Input() public fields: IFormField[];
  @Output() submitted: any = new EventEmitter();
  form: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.createGroup();
  }

  createGroup() {
    const group = this.fb.group({});
    this.fields.forEach(control => group.addControl(control.key, this.fb.control(control.value)));
    return group;
  }

  submit() {
    const outObject = this.form.value;
    if (!this.form.value.id) { delete this.form.value.id; }
    this.submitted.emit(outObject);
  }
}
