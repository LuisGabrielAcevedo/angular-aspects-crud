import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import * as AspectsActions from './aspects.actions';
import { AspectsService } from './aspects.service';
import * as  fromRoot from '../store.index';
import { AspectsStoreResourceInformation } from './aspects.interfaces';

@Injectable()
export class AspectsEffects {
    constructor(
        private actions$: Actions,
        private aspectsService: AspectsService,
        private store$: Store<fromRoot.State>
    ) { }

    @Effect()
    searchAspects$: Observable<Action> = this.actions$.pipe(
        ofType<AspectsActions.SearchAspectsAction>(AspectsActions.SEARCH_ASPECTS),
        map(action => action.payload),
        withLatestFrom(this.store$.select(fromRoot.getAspects)),
        // @ts-ignore
        switchMap(([loadRequest, allAspects]) => {
            const currentAspects: AspectsStoreResourceInformation = allAspects[loadRequest.resource];
            if (currentAspects) {
                const resourceInfo: AspectsStoreResourceInformation = {};
                resourceInfo[loadRequest.resource] = currentAspects;
                return [
                    new AspectsActions.SetCurrentAspectsAction(resourceInfo)
                ];
            } else {
                return [
                    new AspectsActions.LoadAspectsAction(loadRequest)
                ];
            }
        })
    );

    @Effect()
    loadAspects$: Observable<Action> = this.actions$.pipe(
        ofType<AspectsActions.LoadAspectsAction>(AspectsActions.LOAD_ASPECTS),
        map(action => action.payload),
        switchMap((loadRequest) =>
            this.aspectsService.loadAspects(loadRequest.modelClass).pipe(
                switchMap((response) => {
                    const resourceInfo: AspectsStoreResourceInformation = {};
                    resourceInfo[loadRequest.resource] = {};
                    resourceInfo[loadRequest.resource]['indexAspects'] = response.indexAspects();
                    resourceInfo[loadRequest.resource]['formAspects'] = response.formAspects();
                    resourceInfo[loadRequest.resource]['searchFields'] = response.searchFields();
                    resourceInfo[loadRequest.resource]['columns'] = response.formColumns();
                    return [
                        new AspectsActions.LoadAspectsSuccessAction(resourceInfo),
                        new AspectsActions.SetCurrentAspectsAction(resourceInfo)
                    ];
                }),
                catchError(errorResp => {
                    return of(new AspectsActions.AspectsErrorAction(errorResp));
                })
            )
        )
    );
}
