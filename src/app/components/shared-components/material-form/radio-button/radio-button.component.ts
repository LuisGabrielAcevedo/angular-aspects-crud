import { Component, OnInit, Input } from '@angular/core';
import { IFormField } from '../material-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {
  @Input() public field: IFormField;
  @Input() public group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
