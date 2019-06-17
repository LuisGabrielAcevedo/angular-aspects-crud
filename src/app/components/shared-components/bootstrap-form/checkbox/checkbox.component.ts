import { Component, OnInit, Input } from '@angular/core';
import { IFormField } from '../bootstrap-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() public field: IFormField;
  @Input() public group: FormGroup;
  constructor() { }
  ngOnInit() {
  }

}
