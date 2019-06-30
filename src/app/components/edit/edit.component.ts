import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';
import { LoadingService } from 'src/app/services/loading.service';
declare var require: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form_aspects = [];
  loading = true;
  model: any;
  title: string = '';
  resource: string = '';
  id: number = null;
  modelClass: any;
  constructor(
    private resourceService: ResourceService,
    public loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.resource = params.get("resource");
      this.id = +params.get("id");
      this.title = this.resource;
      this.resourceService.setUrl(this.resource);
      this.modelClass = require(`src/app/models/${this.resource}`).default;
      this.loadModel();
    });
  }

  ngOnInit() {
  }

  loadModel() {
    this.loading = true;
    this.modelClass.find(this.id).then(resp => {
      this.model = resp;
      this.loadAspects();
    });
  }

  async loadAspects() {
    const builder = await this.resourceService.builder();
    this.form_aspects = builder.formAspects();
    this.loading = false;
  }

  save(model: any) {
    this.loadingService.on();
    this.modelClass = new this.modelClass();
    this.modelClass.create(model);
    this.modelClass.save(model).then(resp => {
      this.router.navigate([this.resource, this.id]);
      this.loadingService.off();
    }) 
  }
}
