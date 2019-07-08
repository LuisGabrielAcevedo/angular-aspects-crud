import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivationEnd, NavigationExtras } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PluralizeService } from 'src/app/services/pluralize.service';
import { AspectInferface } from 'src/app/aspects/interfaces/aspect';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { AxiosquentPagination } from 'src/app/axioquent/interfaces/axiosquent-pagination';
import { AspectsSandbox } from 'src/app/store/aspects/aspects.sandbox';
declare const require: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnDestroy, OnInit {
  constructor(
    private pluralizeService: PluralizeService,
    private aspectsSandbox: AspectsSandbox,
    private router: Router
  ) {

    this.subscriptions.push(
      this.router.events
      .pipe(
        filter((event: ActivationEnd) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.routeConfig.path === ':resource')
      )
      .subscribe(resp => {
        const resource: string = resp.snapshot.params['resource'];
        const queryParams: { [key: string]: any } = resp.snapshot.queryParams;
        if (queryParams.params) { this.searchModel = JSON.parse(resp.snapshot.queryParams.params); }
        if (this.resource !== resource) {
            this.loading = true;
            this.resource = resource;
            this.displayedColumns = [];
            this.title = this.resource;
            this.modelClass = require(`src/app/models/${this.pluralizeService.singular(this.resource)}`).default;
            this.aspectsSandbox.searchAspects(this.resource, this.modelClass);
        } else {
          if (this.searchModel) {
            this.loading = true;
            this.searchAction();
          }
        }
      })
    );
  }
  subscriptions: Subscription[] = [];
  aspects: AspectInferface[] = [];
  data: object[] = [];
  search_fields: { [key: string]: AspectInferface } = {};
  displayedColumns: string[];
  loading: boolean;
  isLoadingAspects: boolean;
  title: string;
  pagination: AxiosquentPagination = {
    per_page: 20,
    current_page: 1,
    total_count: 0
  };
  resource: string;
  modelClass;
  searchModel: { [key: string]: string | object } = null;
  goTo = (id: number) => this.router.navigate([this.resource, id]);
  goToNew = () => this.router.navigate([this.resource, 'new']);

  ngOnInit() {
    this.subscriptions.push(
      this.aspectsSandbox.fetchIsLoading().subscribe(isLoadingAspects => {
        this.isLoadingAspects = isLoadingAspects
      }),
      this.aspectsSandbox.fetchCurrentAspects().subscribe(aspects => {
        if (aspects[this.resource]) {
          this.aspects = aspects[this.resource]['indexAspects'];
          this.search_fields = aspects[this.resource]['searchFields'];
          this.aspects.forEach(element => this.displayedColumns.push(element.accessor));
          this.searchModel ? this.searchAction() : this.setPagination(this.pagination.current_page, this.pagination.per_page);
        } 
      })
    )
  }

  pageParams(page: PageEvent) {
    const currentPage = page.pageIndex + 1;
    this.setPagination(currentPage, page.pageSize);
  }

  setPagination(current_page: number, per_page: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        params: JSON.stringify({
          ... this.searchModel,
          current_page,
          per_page
        })
      }
    };
    this.router.navigate([this.resource], navigationExtras);
  }

  async searchAction() {
    this.pagination.current_page = +this.searchModel.current_page;
    this.pagination.per_page = +this.searchModel.per_page;
    delete this.searchModel.per_page;
    delete this.searchModel.current_page;
    let query = this.modelClass;
    Object.keys(this.searchModel)
    .filter(param => this.searchModel[param])
    .forEach(param => {
    query = query.option(`q[${param}]`, this.searchModel[param]);
    });
    this.loadData(query);
  }

  async loadData(modelClass) {
    const resp = await modelClass.all(this.pagination.current_page, this.pagination.per_page);
    this.data = resp.data;
    this.pagination = resp.pagination;
    this.loading = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}


// ----- AXIOSQUENT OPTIONS ---------------------------------------------------- //

//       this.modelClass
//       .header('pin_code', '123456')
//       .where('country_id', '1')
//       .orWhere(['name', 'profile.first_name', 'profile.last_name'], 'Luis')
//       .option('rules', 'true')
//       .with(['profile, roles', 'settings'])
//       .orderBy('created_at', 'desc')
//       .all(1, 20);
