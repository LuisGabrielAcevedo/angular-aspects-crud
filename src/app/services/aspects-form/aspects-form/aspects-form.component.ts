import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-aspects-form',
  templateUrl: './aspects-form.component.html',
  styleUrls: ['./aspects-form.component.css']
})
export class AspectsFormComponent implements OnInit {
  @Input() public aspects;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.aspects);
  }
}
