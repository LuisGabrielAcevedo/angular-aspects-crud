import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.paramMap.subscribe(params => {
      this.resource = params.get("resource");
      this.title = this.resource;
      this.resourceService.setUrl(this.resource);
      const model = this.resourceService.getModel();
      this.model = new model();
    });
  }

  ngOnInit() {
    this.loadAspects();
  }

  save(model: any) {
    this.resourceService.post(model).subscribe(() => this.router.navigate([this.resource]));
  }

  async loadAspects() {
    this.loading = true;
    const builder = await this.resourceService.builder();
    this.form_aspects = builder.formAspects();
  }
}
