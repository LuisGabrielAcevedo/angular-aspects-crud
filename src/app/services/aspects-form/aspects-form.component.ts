import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aspects-form',
  templateUrl: './aspects-form.component.html',
  styleUrls: ['./aspects-form.component.css']
})
export class AspectsFormComponent implements OnInit {
  @Input() public aspects;
  @Input() public model;
  @Output() submitted: any = new EventEmitter();
  group: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.group = this.fb.group({});
  }
  ngOnInit() { }

  submit() {
    let outObject = this.group.value;
    if (!this.group.value.id) delete this.group.value.id;
    this.group.valid ? this.submitted.emit(outObject) : console.log('Invalid form');
  }
}
