import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Aspect } from 'src/app/services/aspect';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  @Input() public aspect: Aspect;
  @Input() public model: any;
  @Input() public group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
