import { Component, OnInit, Input } from '@angular/core';
import { IFormField } from '../material-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  @Input() public field: IFormField;
  @Input() public group: FormGroup;
  constructor() { }
  ngOnInit() {
  }

}
