import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { PluralizeService } from 'src/app/services/pluralize.service';
import { Aspect } from 'src/app/aspects/aspect';
import { AxiosquentModel } from 'axiosquent-ts/dist/interfaces/axiosquent-model';
import { AspectsFormComponent } from 'src/app/aspects/aspects-form/aspects-form.component';
import { MessagesService } from 'src/app/services/messages.service';
import { Subscription } from 'rxjs';
import { AspectsSandbox } from 'src/app/store/aspects/aspects.sandbox';
declare var require: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {
  @ViewChild(AspectsFormComponent) formClass: AspectsFormComponent;
  subscriptions: Subscription[] = [];
  isLoadingAspects: boolean;
  form_aspects: Aspect[] = [];
  columns: number;
  loading: boolean;
  title: string;
  resource: string;
  modelClass;
  constructor(
    private pluralizeService: PluralizeService,
    private loadingService: LoadingService,
    private messagesService: MessagesService,
    private aspectsSandbox: AspectsSandbox,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.resource = params.get('resource');
      this.title = this.pluralizeService.singular(this.resource);
      this.modelClass = require(`src/app/models/${this.pluralizeService.singular(this.resource)}`).default;
      this.aspectsSandbox.searchAspects(this.resource, this.modelClass);
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.aspectsSandbox.fetchIsLoading().subscribe(isLoadingAspects => {
        this.isLoadingAspects = isLoadingAspects;
      }),
      this.aspectsSandbox.fetchCurrentAspects().subscribe(aspects => {
        if (aspects[this.resource]) {
          this.form_aspects = aspects[this.resource]['formAspects'];
          this.columns = aspects[this.resource]['columns'];
        }
      })
    );
  }

  async saveAction(model: AxiosquentModel) {
    this.loadingService.on();
    const modelClass = new this.modelClass();
    modelClass.create(model);
    try {
      const resp = await modelClass.save();
      this.loadingService.off();
      this.router.navigate([this.resource]);
    } catch (e) {
      this.messagesService.renderErrorMessage(e);
    } finally {
      this.loadingService.off();
    }
  }

  save() {
    this.formClass.submit();
  }

  cancel() {
    this.router.navigate([this.resource]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
