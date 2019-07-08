import { Action } from '@ngrx/store';
import { AspectsStoreRequestInterface, AspectsStoreResourceInformation } from './aspects.interfaces';

export const SEARCH_ASPECTS = '[Aspects] Search Aspects';
export const SET_CURRENT_ASPECTS = '[Aspects] Set Current Aspects';
export const LOAD_ASPECTS = '[Aspects] Load Aspects';
export const LOAD_ASPECTS_SUCCESS = '[Aspects] Load Aspects Succces';
export const ASPECTS_ERROR = '[Aspects] Aspects Error';

export class SearchAspectsAction implements Action {
    readonly type = SEARCH_ASPECTS;
    constructor(public payload: AspectsStoreRequestInterface) {}
}

export class SetCurrentAspectsAction implements Action {
    readonly type = SET_CURRENT_ASPECTS;
    constructor(public payload: AspectsStoreResourceInformation) {}
}

export class LoadAspectsAction implements Action {
    readonly type = LOAD_ASPECTS;
    constructor(public payload: AspectsStoreRequestInterface) {}
}

export class LoadAspectsSuccessAction implements Action {
    readonly type = LOAD_ASPECTS_SUCCESS;
    constructor(public payload: AspectsStoreResourceInformation) {}
}

export class AspectsErrorAction implements Action {
    readonly type = ASPECTS_ERROR;
    constructor(public payload: any) {}
}

export type Actions
    = SearchAspectsAction
    | SetCurrentAspectsAction
    | LoadAspectsAction
    | LoadAspectsSuccessAction 
    | AspectsErrorAction;