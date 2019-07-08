import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { LoadingService } from 'src/app/services/loading.service';
import { PluralizeService } from 'src/app/services/pluralize.service';
import { Builder } from 'src/app/aspects/builder';
import { Aspect } from 'src/app/aspects/aspect';
import { Subscription } from 'rxjs';
import { AspectsSandbox } from 'src/app/store/aspects/aspects.sandbox';
declare var require: any;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, OnDestroy {
  constructor(
    private pluralizeService: PluralizeService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public loadingService: LoadingService,
    private aspectsSandbox: AspectsSandbox,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.resource = params.get('resource');
      this.id = +params.get('id');
      this.title = this.resource;
      this.modelClass = require(`src/app/models/${this.pluralizeService.singular(this.resource)}`).default;
      this.aspectsSandbox.searchAspects(this.resource, this.modelClass);
    });
  }
  loading = false;
  aspects: Aspect[] = [];
  subscriptions: Subscription[] = [];
  isLoadingAspects: boolean;
  model: any;
  resource: string;
  id: number;
  title: string;
  modelClass;
  goToEdit = () => this.router.navigate([this.resource, this.id, 'edit']);
  goToIndex = () => this.router.navigate([this.resource]);


  ngOnInit() {
    this.subscriptions.push(
      this.aspectsSandbox.fetchIsLoading().subscribe(isLoadingAspects => {
        this.isLoadingAspects = isLoadingAspects
      }),
      this.aspectsSandbox.fetchCurrentAspects().subscribe(aspects => {
        if (aspects[this.resource]) {
          this.aspects = aspects[this.resource]['formAspects'];
          this.loadData();
        } 
      })
    )
  } 

  async loadData() {
    this.loading = true;
    const resp = await this.modelClass.find(this.id);
    this.model = resp;
  }

  preDestoy() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      height: '110px',
      data:
      {
        model: this.model,
        resource: this.resource
      },
    });

    dialogRef.afterClosed().subscribe(async (resp) => {
      if (resp) {
        this.loadingService.on();
        const modelClass = new this.modelClass();
        await modelClass.destroy(this.id);
        this.loadingService.off();
        this.router.navigate([this.resource]);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
