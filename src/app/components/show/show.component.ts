import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { LoadingService } from 'src/app/services/loading.service';
import Users from '../../models/users';
declare var require: any;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  loading: boolean = false;
  aspects = [];
  model: any;
  resource: string = '';
  id: number = null;
  title: string = '';
  modelClass: any;
  constructor(
    private resourceService: ResourceService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public loadingService: LoadingService,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.resource = params.get("resource");
      this.id = +params.get("id");
      this.title = this.resource;
      this.resourceService.setUrl(this.resource);
      this.modelClass = require(`src/app/models/${this.resource}`).default;
      this.loadData();
    });
  }

  ngOnInit() {}

  loadData() {
    this.loading = true;
    this.modelClass.find(this.id).then(resp => {
      this.model = resp;
      this.loadAspects();
    });
  }

  async loadAspects() {
    const builder = await this.resourceService.builder();
    this.aspects = builder.formAspects();
  }

  goToEdit = () => this.router.navigate([this.resource, this.id, 'edit']);

  goToIndex = () => this.router.navigate([this.resource]);

  preDelete() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      height: '110px',
      data:
      {
        model: this.model,
        resource: this.resource
      },
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.loadingService.on();
        this.modelClass = new this.modelClass();
        this.modelClass.delete(this.id).then(resp => {
          this.loadingService.off();
          this.router.navigate([this.resource]);
        });
      }
    });
  }
}
