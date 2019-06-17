import { Component, OnInit, Input } from '@angular/core';
import { IFormField } from '../material-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Input() public field: IFormField;
  @Input() public group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
