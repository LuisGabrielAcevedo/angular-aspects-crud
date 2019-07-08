import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AspectsActions from '../aspects/aspects.actions';
import * as fromRoot from '../store.index';
import { Base } from 'src/app/models/abstract-model/base';

@Injectable({
    providedIn: 'root'
})
export class AspectsSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchIsLoading(): Observable<any> {
        return this.store.select(fromRoot.isLoadingAspects);
    }
    fetchAspects(): Observable<any> {
        return this.store.select(fromRoot.getAspects);
    }
    fetchCurrentAspects(): Observable<any> {
        return this.store.select(fromRoot.getCurrentAspects);
    }
    loadAspects(resource: string, modelClass: Base): void {
        this.store.dispatch(new AspectsActions.LoadAspectsAction({
            modelClass,
            resource
        }));
    }
    searchAspects(resource: string, modelClass: Base): void {
        this.store.dispatch(new AspectsActions.SearchAspectsAction({
            modelClass,
            resource
        }));
    }
}