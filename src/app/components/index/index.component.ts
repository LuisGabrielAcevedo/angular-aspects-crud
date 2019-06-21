import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ResourceService } from '../../services/resource.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  aspects = [];
  data = [];
  displayedColumns: string[] = [];
  loading = true;
  title: string = '';
  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const resource: string = params.get("resource");
      this.title = resource;
      this.resourceService.setUrl(resource);
    });
   }

  ngOnInit() {
    this.loadAspects();
  }

  async loadAspects() {
    this.loading = true;
    const builder = await this.resourceService.builder();
    this.aspects = builder.indexAspects();
    this.aspects.forEach(element => this.displayedColumns.push(element.accessor));
    this.loadData();
  }

  loadData() {
    this.resourceService.getAll().subscribe(
      resp => {
        this.loading = false;
        this.data = resp;
      }
    );
  }
}
