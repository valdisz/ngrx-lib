import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { createReducer as createCollectionReducer, CollectionReducerSettings, CollectionActions, CollectionState, LoadAction } from '../collection';

export interface PagedCollectionState<T> extends CollectionState<T> {
    selectedPageNo: number;
    pageSize: number;
    count: number;
}

export interface PagedCollectionActions extends CollectionActions {
    LOAD_PAGE: string;
}

export interface LoadPageAction<T> extends Action {
    payload: {
        items: T[];
        count: number;
        pageSize: number;
        pageNo: number;
    }
}

export interface PagedCollectionReducerSettings<T> extends CollectionReducerSettings<T> {
    pageSize?: number
}

export function createReducer<T>(actions: PagedCollectionActions, settings?: PagedCollectionReducerSettings<T>): ActionReducer<PagedCollectionState<T>> {
    const pageSize = (settings && settings.pageSize) || 100;

    const defaultState: PagedCollectionState<any> = {
        ids: [ ],
        index: { },
        selectedId: null,
        selectedPageNo: null,
        pageSize,
        count: 0
    };

    const collectionReducer = <ActionReducer<PagedCollectionState<T>>>createCollectionReducer(actions, settings);

    return (state: PagedCollectionState<T> = defaultState, action: Action) => {
        switch (action.type) {
            case actions.LOAD_PAGE: {
                const { payload } = <LoadPageAction<T>>action;

                state = collectionReducer(state, <LoadAction<T>>{ type: actions.LOAD, payload: payload.items });
                state.selectedPageNo = payload.pageNo;
                state.count = payload.count;
                state.pageSize = payload.pageSize;

                return state;
            }

            default:
                return collectionReducer(state, action);
        }
    };
}
