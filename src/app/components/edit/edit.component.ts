import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';

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
  resource: string;
  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.resource = params.get("resource");
      const id : string = params.get("id");
      this.title = this.resource;
      this.resourceService.setUrl(this.resource);
      this.loadModel(+id);
    });
  }

  ngOnInit() {
  }

  loadModel(id: number) {
    this.resourceService.get(id).subscribe(
      resp => {
        const model = this.resourceService.getModel();
        this.model = new model(resp);
        this.loadAspects(); 
      }
    )
  }

  save(model: any) {
    this.resourceService.put(model).subscribe(() => this.router.navigate([this.resource]));
  }

  async loadAspects() {
    this.loading = true;
    const builder = await this.resourceService.builder();
    this.form_aspects = builder.formAspects();
  }

}
