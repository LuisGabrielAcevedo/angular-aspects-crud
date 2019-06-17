import { Component, OnInit, Input } from '@angular/core';
import { IFormField } from '../bootstrap-form.interfaces';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() public field: IFormField;
  @Input() public group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
