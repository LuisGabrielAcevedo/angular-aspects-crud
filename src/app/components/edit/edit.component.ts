import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';
import { LoadingService } from 'src/app/services/loading.service';

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
      this.loadModel();
    });
  }

  ngOnInit() {
  }

  loadModel() {
    this.resourceService.get(this.id).subscribe(
      resp => {
        const model = this.resourceService.model();
        this.model = new model(resp);
        this.loadAspects();
      }
    )
  }

  async loadAspects() {
    this.loading = true;
    const builder = await this.resourceService.builder();
    this.form_aspects = builder.formAspects();
  }

  save(model: any) {
    this.loadingService.on();
    this.resourceService.put(model).subscribe(() => {
      this.router.navigate([this.resource, this.id]);
      this.loadingService.off();
    });
  }
}
