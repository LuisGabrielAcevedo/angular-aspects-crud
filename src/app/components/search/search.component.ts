import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() searchFields: {[key: string]: string[]};
  group: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {
    this.group = this.fb.group({});
    this.group.addControl('search', this.fb.control(''));
  }

  ngOnInit() {
    // console.log(this.searchFields);
  }

  search() {

  }

  clear() {
    
  }

}
