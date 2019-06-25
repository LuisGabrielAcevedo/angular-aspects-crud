import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { Router, ActivationEnd } from '@angular/router';
import { Builder } from '../../services/builder';
import { Aspect } from '../../services/aspect';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  aspects: Aspect[] = [];
  data: object[] = [];
  search_fields : {[key: string]: Aspect} = {};
  displayedColumns: string[];
  loading: boolean = true;
  title: string = '';
  resource: string = '';
  constructor(
    private resourceService: ResourceService,
    private router: Router
  ) {

    this.router.events
    .pipe(
      filter( (event: ActivationEnd) => event instanceof ActivationEnd)
    )
    .subscribe(resp => {
      const resource = resp.snapshot.params['resource'];
      if (this.resource !== resource) {
        this.displayedColumns = [];
        this.resource = resource;
        this.title = this.resource;
        this.resourceService.setUrl(this.resource);
        this.loadAspects();
      }
    })
  }

  ngOnInit() {
  }



  async loadAspects() {
    this.loading = true; 
    const builder: Builder = await this.resourceService.builder();
    this.aspects = builder.indexAspects();
    this.search_fields = builder.searchFields();
    this.aspects.forEach(element => this.displayedColumns.push(element.accessor));
    this.loadData();
  }

  loadData() {
    this.resourceService.getAll().subscribe(
      resp => {
        this.data = resp;
        this.loading = false;
      }
    );
  }

  goTo = (id: number) => this.router.navigate([this.resource, id]);

  goToNew = (id: number) => this.router.navigate([this.resource, 'new']);
}
