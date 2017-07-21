import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { Comparer, equalityComparer, EqualityComparer, IdSelector, selectByName, uplift } from '../utils';

export interface CollectionItems<T> {
    [id: string]: T;
}

export interface CollectionState<T> {
    ids: string[];
    index: CollectionItems<T>;
    selectedId: string | null;
}

const defaultState: CollectionState<any> = {
    ids: [ ],
    index: { },
    selectedId: null
}

export interface CollectionActions {
    LOAD: string;
    INSERT: string;
    REMOVE: string;
    CLEAR: string;
    REPLACE: string;
    SELECT: string;
    DESELECT: string;
}

export type InsertPosition = number | 'start' | 'end';

export interface LoadAction<T> extends Action {
    payload: T[];
}

export interface InsertAction<T> extends Action {
    payload: {
        position?: InsertPosition,
        value: T
    }
}

export interface RemoveAction extends Action {
    payload: string;
}

export interface ClearAction extends Action {

}

export interface ReplaceAction<T> extends Action {
    payload: {
        id: string;
        value: T
    }
}

export interface SelectAction extends Action {
    payload: string;
}

export interface DeselectAction extends Action {

}

export interface CollectionReducerSettings<T> {
    compareBy?: EqualityComparer<T>;
    sortBy?: Comparer<T>;
    idSelector?: string | IdSelector<T>;
}

export function createReducer<T>(actions: CollectionActions, settings?: CollectionReducerSettings<T>): ActionReducer<CollectionState<T>> {
    const compareBy = (settings && settings.compareBy) || equalityComparer;
    const sortBy = settings && settings.sortBy;
    const selectId = uplift(settings && settings.idSelector, selectByName) || selectByName('id');

    return (state: CollectionState<T> = defaultState, action: Action) => {
        switch (action.type) {
            case actions.LOAD: {
                const { payload } = <LoadAction<T>>action;

                let items: T[];
                if (sortBy) {
                    items = [...payload];
                    items.sort(sortBy);
                }
                else {
                    items = payload;
                }
                const ids = items.map(selectId);

                const index = payload
                    .reduce((index, item) => {
                            index[selectId(item)] = item;
                            return index;
                        },
                        <CollectionItems<T>>{ }
                    );

                return { ids, index, selectedId: null };
            }

            case actions.INSERT: {
                const { payload } = <InsertAction<T>>action;

                const id = selectId(payload.value);

                const index = { ...state.index };
                index[id] = payload.value;

                let ids: string[];

                const insertAt: InsertPosition = payload.position || 'end';
                if (insertAt === 'start')
                    ids = [id, ...state.ids];
                else if (insertAt === 'end')
                    ids = [...state.ids, id];
                else {
                    ids = [...state.ids];
                    ids.splice(insertAt, 0, id);
                }

                return { ...state, ids, index };
            }

            case actions.REMOVE: {
                const { payload } = <RemoveAction>action;

                if (state.index[payload]) {
                    const index = {...state.index };
                    delete index[payload];

                    return {
                        ...state,
                        ids: state.ids.filter(x => x !== payload),
                        index
                    };
                }

                return state;
            }

            case actions.CLEAR: {
                if (state.ids.length == 0) return state;

                return {...defaultState };
            }

            case actions.REPLACE: {
                const { payload } = <ReplaceAction<T>>action;

                const index = { ...state.index };
                index[payload.id] = payload.value;

                return { ...state, index };
            }

            case actions.SELECT: {
                const { payload } = <SelectAction>action;

                if (state.index[payload] && state.selectedId !== payload)
                    return { ...state, selectedId: payload };

                return state;
            }

            case actions.DESELECT: {
                if (state.selectedId)
                    return { ...state, selectedId: null };

                return state;
            }

            default:
                return state;
        }
    };
}
