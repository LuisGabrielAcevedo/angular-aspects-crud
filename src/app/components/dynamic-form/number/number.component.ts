import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form.component';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent extends DynamicFormComponent implements OnInit {
  constructor() { 
    super();
  }

  ngOnInit() {
    
  }
}
