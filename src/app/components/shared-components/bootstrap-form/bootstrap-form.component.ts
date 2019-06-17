import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IFormField } from './bootstrap-form.interfaces';

@Component({
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrls: ['./bootstrap-form.component.css']
})
export class BootstrapFormComponent implements OnInit {
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
    this.submitted.emit(this.form.value);
  }
}
