import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AspectsFormComponent } from 'src/app/aspects/aspects-form/aspects-form.component';
import { AxiosquentModel } from 'src/app/axioquent';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(AspectsFormComponent) form: AspectsFormComponent;
  @Input() searchFields: { [key: string]: any };
  @Input() searchModel: { [key: string]: any };
  @Input() resource: string;
  searchValue: FormControl = new FormControl();
  paramsFormatted: { [key: string]: string[] } = {};
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  async searchAction(model: AxiosquentModel) {
    const searchModel = {};
    Object.keys(model)
    .filter(param => model[param])
    .forEach(param => {
      if (model[param]) {
        searchModel[param] = model[param];
      }
    });
    const navigationExtras: NavigationExtras = {
      queryParams: {
        params: JSON.stringify({
          ... searchModel,
          current_page: 1,
          per_page: 20
        })
      }
    };
    this.router.navigate([this.resource], navigationExtras);
  }

  search() {
    this.form.submit();
  }

  clear() {
    this.form.reset();
  }
}
