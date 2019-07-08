import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
declare var require: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  form_aspects = [];
  loading = true;
  model: any;
  title: string = '';
  resource: string;
  modelClass: any;
  constructor(
    private resourceService: ResourceService,
    public loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.resource = params.get("resource");
      this.title = this.resource;
      this.resourceService.setUrl(this.resource);
      const model_class = require(`src/app/models/${this.resource}`).default;
      this.modelClass = new model_class();
      this.model = this.modelClass.default_model;
    });
  }

  ngOnInit() {
    this.loadAspects();
  }

  save(model: any) {
    this.loadingService.on();
    this.modelClass.create(model);
    this.modelClass.save().then(resp => {
        this.loadingService.off();
        this.router.navigate([this.resource])
    })
  }

  async loadAspects() {
    this.loading = true;
    const builder = await this.resourceService.builder();
    this.form_aspects = builder.formAspects();
  }
}
