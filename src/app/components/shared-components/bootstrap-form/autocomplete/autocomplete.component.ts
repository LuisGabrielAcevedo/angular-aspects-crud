import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormField } from '../bootstrap-form.interfaces';

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
