import { Component, OnInit, Input } from '@angular/core';
import { IFormField } from '../material-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() public field: IFormField;
  @Input() public group: FormGroup;
  constructor() { }
  ngOnInit() {
  }
}
