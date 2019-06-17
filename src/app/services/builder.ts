import { Injectable } from '@angular/core';
import { Aspect } from './aspect';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Builder {
  model_class;
  aspects_table = [];
  search_fields = [];
  constructor(model_class) {
    this.model_class = model_class;
  }

  buildAspects(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getAspects().subscribe(
        resp => {
          this.search_fields = resp.search_fields;
          resp.aspects.forEach(aspect => {
            const aspectInstance = this.getAspectFor(aspect);
            this.aspects_table.push(aspectInstance);
          });
          resolve(this.aspects_table);
        }
      );
    })
  }

  getAspects(): Observable<any> {
    return this.model_class.getAspectsFromAPI();
  }

  aspects() {
    return this.buildAspects();
  }

  getAspectFor(aspect: any) {
    return new Aspect(
      aspect.name,
      aspect.accessor,
      aspect.type,
      aspect.default,
      aspect.nullable,
      aspect.options
    );
  }

  indexAspects() {
    this.buildAspects().then(resp => {
      return resp.filter(aspect => {
        aspect.isVisible();
      })
    })
  }
}
