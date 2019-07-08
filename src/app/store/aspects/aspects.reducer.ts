import * as AspectsActions from './aspects.actions';
import { AspectsStoreResourceInformation } from './aspects.interfaces';

export interface AspectsState {
    isLoadingAspects: boolean;
    aspects: AspectsStoreResourceInformation;
    currentAspects: AspectsStoreResourceInformation;
}

export const initialState: AspectsState = {
    isLoadingAspects: false,
    aspects: {},
    currentAspects: {}
};

export const getIsLoadingAspects = (state: AspectsState) => state.isLoadingAspects;
export const getAspects = (state: AspectsState) => state.aspects;
export const getCurrentAspects = (state: AspectsState) => state.currentAspects;


export function AspectsReducer(state = initialState, action: AspectsActions.Actions): AspectsState {
    switch (action.type) {
        case AspectsActions.SEARCH_ASPECTS: {
            return Object.assign({}, state, {
                isLoadingAspects: true
            });
        }
        case AspectsActions.SET_CURRENT_ASPECTS: {
            return Object.assign({}, state, {
                isLoadingAspects: false,
                currentAspects: action.payload
            });
        }
        case AspectsActions.LOAD_ASPECTS: {
            return Object.assign({}, state, {
                isLoadingAspects: true
            });
        }
        case AspectsActions.LOAD_ASPECTS_SUCCESS: {
            const aspects = { ...state.aspects, ...action.payload }
            return Object.assign({}, state, {
                isLoadingAspects: false,
                aspects
            });
        }
        case AspectsActions.ASPECTS_ERROR: {
            return Object.assign({}, state, {
                isLoadingAspects: false
            });
        }
        default: { return state; }
    }
}