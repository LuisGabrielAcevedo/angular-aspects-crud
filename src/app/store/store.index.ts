import { createSelector } from 'reselect';
import { ActionReducerMap } from '@ngrx/store';
import * as fromAspects from './aspects/aspects.reducer';

export interface State {
    aspects: fromAspects.AspectsState
}

export const reducers: ActionReducerMap<State> = {
    aspects:fromAspects.AspectsReducer
}

export const getAspectsState = (state: State) => state.aspects;

export const isLoadingAspects = createSelector(getAspectsState, fromAspects.getIsLoadingAspects);
export const getAspects = createSelector(getAspectsState, fromAspects.getAspects);
export const getCurrentAspects = createSelector(getAspectsState, fromAspects.getCurrentAspects);