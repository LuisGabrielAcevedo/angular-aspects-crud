import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { AspectsFormModel } from '../../interfaces/aspects-form-model';
import { AspectInferface } from '../../interfaces/aspect';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  @Input() public aspect: AspectInferface;
  @Input() public model: AspectsFormModel;
  @Input() public group: FormGroup;
  @Input() public appearance: string;
  validations: ValidatorFn[] = [];
  public key: string;
  data: any[] = [];

  filteredOptions: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.key = this.aspect.options.foreign_key || this.aspect.accessor;
    const initValue: any = this.model ? this.model[this.key] : this.aspect.defaultValue();
    // if (this.aspect.options.required) { this.validations.push(Validators.required); }
    this.group.addControl(this.key, this.fb.control(initValue));
    this.loadData();
    this.filteredOptions = this.group.controls[this.key].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.data.slice())
      );
  }

  async loadData() {
    const resp = await this.aspect.selectOptions();
    this.data = resp.data;
  }

  displayFn(user?: any): string | undefined {
    console.log(user);
    return user ? user.name : undefined;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.data.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
